import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { MessageSquareText, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-20 flex-col border-r border-white/10 bg-slate-950/55 lg:w-80">
      <div className="border-b border-white/10 p-4 lg:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Users className="size-5" />
          </div>
          <div className="hidden lg:block">
            <p className="font-semibold">Contacts</p>
            <p className="text-sm text-white/55">Pick a chat and start talking</p>
          </div>
        </div>

        <div className="mt-4 hidden items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 lg:flex">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm font-medium">Show online only</span>
          </label>
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs text-white/60">
            {Math.max(onlineUsers.length - 1, 0)} online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 lg:px-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all
              hover:bg-white/5
              ${selectedUser?._id === user._id ? "bg-cyan-400/10 text-cyan-100 shadow-sm ring-1 ring-cyan-400/20" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-slate-950"
                />
              )}
            </div>

            <div className="hidden min-w-0 lg:block">
              <div className="truncate font-medium">{user.fullName}</div>
              <div className="text-sm text-white/55">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="px-3 py-10 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-white/5 text-white/50">
              <MessageSquareText className="size-5" />
            </div>
            <p className="text-sm font-medium">No contacts to show</p>
            <p className="mt-1 text-xs text-white/55">
              Try turning off the online filter to see everyone.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
