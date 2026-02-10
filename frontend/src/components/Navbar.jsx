import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Sparkles, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 transition hover:opacity-90">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20">
              <MessageSquare className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Chatty</h1>
              <p className="mt-1 hidden text-xs uppercase tracking-[0.24em] text-white/45 sm:block">
                Modern conversation hub
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 md:flex">
            <Sparkles className="size-4 text-cyan-300" />
            Cleaner chat experience
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {authUser && (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 lg:flex">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  className="size-9 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="max-w-32 truncate text-sm font-semibold">{authUser.fullName}</p>
                  <p className="text-xs text-white/55">Ready to chat</p>
                </div>
              </div>

              <Link
                to="/profile"
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium transition hover:bg-white/10"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-medium text-slate-950 transition hover:opacity-90"
                onClick={logout}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
