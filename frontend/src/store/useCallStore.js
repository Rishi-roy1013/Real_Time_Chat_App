import { create } from "zustand";
import toast from "react-hot-toast";

import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

const RTC_CONFIG = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
  ],
};

const initialState = {
  callStatus: "idle",
  callType: "audio",
  activeCallUser: null,
  incomingCall: null,
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  isInitializingCall: false,
  isMuted: false,
  isCameraOff: false,
  socketBoundId: null,
};

const stopStream = (stream) => {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
};

export const useCallStore = create((set, get) => ({
  ...initialState,

  resetCallState: () => {
    const { peerConnection, localStream, remoteStream } = get();

    if (peerConnection) {
      peerConnection.onicecandidate = null;
      peerConnection.ontrack = null;
      peerConnection.onconnectionstatechange = null;
      peerConnection.close();
    }

    stopStream(localStream);
    stopStream(remoteStream);

    set({
      callStatus: "idle",
      callType: "audio",
      activeCallUser: null,
      incomingCall: null,
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      isInitializingCall: false,
      isMuted: false,
      isCameraOff: false,
    });
  },

  initializeCallListeners: (socket) => {
    if (!socket) return;
    if (get().socketBoundId === socket.id) return;

    const clearCallWithMessage = (message) => {
      if (message) toast(message);
      get().resetCallState();
    };

    socket.off("call:offer");
    socket.off("call:answer");
    socket.off("call:ice-candidate");
    socket.off("call:decline");
    socket.off("call:busy");
    socket.off("call:end");
    socket.off("call:unavailable");

    socket.on("call:offer", ({ fromUserId, offer, callType, caller }) => {
      if (get().callStatus !== "idle") {
        socket.emit("call:busy", { to: fromUserId });
        return;
      }

      const callerUser = {
        _id: fromUserId,
        fullName: caller?.fullName || "Unknown user",
        profilePic: caller?.profilePic || "",
      };

      useChatStore.getState().setSelectedUser(callerUser);
      set({
        incomingCall: {
          fromUserId,
          offer,
          callType,
          caller: callerUser,
        },
        activeCallUser: callerUser,
        callType,
        callStatus: "ringing",
      });

      toast.success(`${callerUser.fullName} is calling you`);
    });

    socket.on("call:answer", async ({ answer }) => {
      const { peerConnection } = get();
      if (!peerConnection) return;

      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        set({ callStatus: "connecting" });
      } catch (error) {
        console.error("Failed to apply call answer", error);
        clearCallWithMessage("Could not connect the call");
      }
    });

    socket.on("call:ice-candidate", async ({ candidate }) => {
      const { peerConnection } = get();
      if (!peerConnection || !candidate) return;

      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Failed to add ICE candidate", error);
      }
    });

    socket.on("call:decline", () => {
      clearCallWithMessage("Call was declined");
    });

    socket.on("call:busy", () => {
      clearCallWithMessage("User is already on another call");
    });

    socket.on("call:end", () => {
      clearCallWithMessage("Call ended");
    });

    socket.on("call:unavailable", ({ reason }) => {
      clearCallWithMessage(reason || "User is unavailable");
    });

    set({ socketBoundId: socket.id });
  },

  createPeerConnection: (targetUserId) => {
    const socket = useAuthStore.getState().socket;
    const remoteStream = new MediaStream();
    const peerConnection = new RTCPeerConnection(RTC_CONFIG);

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      set({ remoteStream });
    };

    peerConnection.onicecandidate = (event) => {
      if (!event.candidate || !socket) return;

      socket.emit("call:ice-candidate", {
        to: targetUserId,
        candidate: event.candidate,
      });
    };

    peerConnection.onconnectionstatechange = () => {
      const { connectionState } = peerConnection;

      if (connectionState === "connected") {
        set({ callStatus: "connected" });
      }

      if (["failed", "disconnected", "closed"].includes(connectionState) && get().callStatus !== "idle") {
        get().resetCallState();
      }
    };

    set({ peerConnection, remoteStream });
    return peerConnection;
  },

  requestMediaStream: async (type) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Media devices are not supported in this browser");
    }

    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: type === "video",
    });
  },

  startCall: async (user, type) => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;

    if (!user?._id) return;
    if (!socket?.connected) {
      toast.error("Socket connection is not ready yet");
      return;
    }
    if (get().callStatus !== "idle") {
      toast.error("Finish the current call first");
      return;
    }

    set({ isInitializingCall: true });

    try {
      const localStream = await get().requestMediaStream(type);
      const peerConnection = get().createPeerConnection(user._id);

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      set({
        localStream,
        activeCallUser: user,
        callType: type,
        callStatus: "calling",
        incomingCall: null,
        isMuted: false,
        isCameraOff: type !== "video",
      });

      socket.emit("call:offer", {
        to: user._id,
        offer,
        callType: type,
        caller: {
          _id: authUser?._id,
          fullName: authUser?.fullName,
          profilePic: authUser?.profilePic,
        },
      });
    } catch (error) {
      console.error("Failed to start call", error);
      get().resetCallState();
      toast.error(error.message || "Could not start the call");
    } finally {
      set({ isInitializingCall: false });
    }
  },

  acceptIncomingCall: async () => {
    const socket = useAuthStore.getState().socket;
    const { incomingCall } = get();

    if (!incomingCall || !socket?.connected) return;

    set({ isInitializingCall: true });

    try {
      const localStream = await get().requestMediaStream(incomingCall.callType);
      const peerConnection = get().createPeerConnection(incomingCall.fromUserId);

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      await peerConnection.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit("call:answer", {
        to: incomingCall.fromUserId,
        answer,
      });

      set({
        localStream,
        activeCallUser: incomingCall.caller,
        callType: incomingCall.callType,
        callStatus: "connecting",
        incomingCall: null,
        isMuted: false,
        isCameraOff: incomingCall.callType !== "video",
      });
    } catch (error) {
      console.error("Failed to accept call", error);
      get().resetCallState();
      toast.error(error.message || "Could not accept the call");
    } finally {
      set({ isInitializingCall: false });
    }
  },

  declineIncomingCall: () => {
    const socket = useAuthStore.getState().socket;
    const { incomingCall } = get();

    if (incomingCall && socket?.connected) {
      socket.emit("call:decline", { to: incomingCall.fromUserId });
    }

    get().resetCallState();
  },

  endCall: () => {
    const socket = useAuthStore.getState().socket;
    const targetUserId = get().activeCallUser?._id || get().incomingCall?.fromUserId;

    if (targetUserId && socket?.connected) {
      socket.emit("call:end", { to: targetUserId });
    }

    get().resetCallState();
  },

  toggleMute: () => {
    const { localStream, isMuted } = get();
    if (!localStream) return;

    localStream.getAudioTracks().forEach((track) => {
      track.enabled = isMuted;
    });

    set({ isMuted: !isMuted });
  },

  toggleCamera: () => {
    const { localStream, isCameraOff } = get();
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff;
    });

    set({ isCameraOff: !isCameraOff });
  },
}));
