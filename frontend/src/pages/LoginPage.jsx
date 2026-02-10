import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.20),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a_45%,_#172554)] text-white">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-10 top-10 h-28 w-28 rounded-full border border-white/10" />
            <div className="absolute bottom-24 right-8 h-40 w-40 rounded-full border border-cyan-300/10" />
          </div>

          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-xl">
              <Sparkles className="size-4 text-cyan-300" />
              Fast, secure and beautifully simple messaging
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30">
                    <MessageSquare className="size-7" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    Log in to continue your conversations, sync messages across devices, and pick up exactly where you left off.
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-right sm:block">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">Trusted space</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-100">
                    <ShieldCheck className="size-4" />
                    Protected login flow
                  </p>
                </div>
              </div>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Response</p>
                  <p className="mt-2 text-lg font-semibold">Instant</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Access</p>
                  <p className="mt-2 text-lg font-semibold">Any device</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Security</p>
                  <p className="mt-2 text-lg font-semibold">Encrypted</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">Email address</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                    <input
                      type="email"
                      className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/40 pl-12 pr-4 text-white placeholder:text-white/35 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white/80">Password</span>
                    <span className="text-xs text-white/45">Minimum 6 characters</span>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/40 pl-12 pr-14 text-white placeholder:text-white/35 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-4 font-semibold text-slate-950 transition hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
                <p>New here? Create your account and start chatting in minutes.</p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Create account
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <AuthImagePattern
          badge="Live conversations"
          title="Your inbox, but designed to feel alive."
          subtitle="Track active chats, share moments instantly, and keep every conversation in one elegant workspace."
          stats={[
            { value: "24/7", label: "Always connected" },
            { value: "HD", label: "Photo sharing" },
            { value: "Sync", label: "Across screens" },
          ]}
        />
      </div>
    </div>
  );
};

export default LoginPage;
