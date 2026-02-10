import { Bell, Lock, MessageSquare, ShieldCheck } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(135deg,_#020617,_#0f172a_48%,_#172554)] px-4 pb-10 pt-24 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <MessageSquare className="size-7" />
              </div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                Theme customization has been removed. This page now keeps the app preferences simple and focused on chat essentials.
              </p>
            </div>
            <div className="rounded-2xl bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200">
              Default theme active
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Bell className="size-6" />
            </div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Message alerts and activity updates remain available inside the chat experience.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <ShieldCheck className="size-6" />
            </div>
            <h2 className="text-lg font-semibold">Account safety</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Your chat app continues to use the same sign-in flow and protected account handling.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Lock className="size-6" />
            </div>
            <h2 className="text-lg font-semibold">Privacy</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Theme switching has been removed to keep the interface cleaner and more consistent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
