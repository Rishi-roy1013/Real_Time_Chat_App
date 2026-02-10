import { PhoneCall, ShieldCheck, Video, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useCallStore } from "../store/useCallStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall, callStatus, activeCallUser, isInitializingCall } = useCallStore();

  const isCallBusy = callStatus !== "idle" && activeCallUser?._id !== selectedUser._id;
  const isUserOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="border-b border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="relative size-11 rounded-full">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">{selectedUser.fullName}</h3>
            <p className="text-sm text-white/60">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/65 md:flex">
            <ShieldCheck className="size-4 text-cyan-300" />
            Secure conversation
          </div>
          <button
            type="button"
            className="hidden size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 md:inline-flex"
            onClick={() => startCall(selectedUser, "audio")}
            disabled={!isUserOnline || isCallBusy || isInitializingCall}
          >
            <PhoneCall className="size-4" />
          </button>
          <button
            type="button"
            className="hidden size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 md:inline-flex"
            onClick={() => startCall(selectedUser, "video")}
            disabled={!isUserOnline || isCallBusy || isInitializingCall}
          >
            <Video className="size-4" />
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
