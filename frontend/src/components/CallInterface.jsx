import { useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";

import { useCallStore } from "../store/useCallStore";

const callStatusLabel = {
  calling: "Calling...",
  ringing: "Incoming call",
  connecting: "Connecting...",
  connected: "Live now",
};

const CallInterface = () => {
  const {
    activeCallUser,
    incomingCall,
    localStream,
    remoteStream,
    callStatus,
    callType,
    isMuted,
    isCameraOff,
    acceptIncomingCall,
    declineIncomingCall,
    endCall,
    toggleMute,
    toggleCamera,
  } = useCallStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  const currentUser = incomingCall?.caller || activeCallUser;
  const effectiveCallType = incomingCall?.callType || callType;

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream || null;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  if (!currentUser || (callStatus === "idle" && !incomingCall)) {
    return null;
  }

  const showVideoLayout = effectiveCallType === "video";

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-6 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/90 p-4 text-white shadow-2xl shadow-slate-950/50 backdrop-blur-2xl">
        <audio ref={remoteAudioRef} autoPlay playsInline />
        <div className="flex items-center gap-3">
          <img
            src={currentUser.profilePic || "/avatar.png"}
            alt={currentUser.fullName}
            className="size-14 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{currentUser.fullName}</p>
            <p className="text-sm text-white/65">
              {callStatusLabel[callStatus] || "Preparing call"} • {effectiveCallType}
            </p>
          </div>
        </div>

        {showVideoLayout ? (
          <div className="relative mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/70">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="h-64 w-full bg-slate-950 object-cover"
            />
            {!remoteStream && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 text-sm text-white/65">
                Waiting for remote video...
              </div>
            )}
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="absolute bottom-3 right-3 h-24 w-20 rounded-2xl border border-white/10 bg-slate-900 object-cover"
            />
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-5 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              <Phone className="size-7" />
            </div>
            <p className="mt-3 text-sm text-white/65">
              Audio is connected through your microphone and speaker.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {callStatus === "ringing" ? (
            <>
              <button
                onClick={acceptIncomingCall}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 font-medium text-slate-950 transition hover:opacity-90"
              >
                <Phone className="size-4" />
                Accept
              </button>
              <button
                onClick={declineIncomingCall}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-rose-500 px-5 font-medium text-white transition hover:opacity-90"
              >
                <PhoneOff className="size-4" />
                Decline
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
              >
                {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
              </button>

              {showVideoLayout && (
                <button
                  onClick={toggleCamera}
                  className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                >
                  {isCameraOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
                </button>
              )}

              <button
                onClick={endCall}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-rose-500 px-5 font-medium text-white transition hover:opacity-90"
              >
                <PhoneOff className="size-4" />
                End
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
