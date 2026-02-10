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
  User,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.22),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.18),_transparent_28%),linear-gradient(135deg,_#031525,_#0b1120_45%,_#132238)] text-white">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)]">
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute right-12 top-14 h-24 w-24 rounded-full border border-white/10" />
            <div className="absolute bottom-16 left-12 h-44 w-44 rounded-full border border-teal-300/10" />
          </div>

          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-xl">
              <Sparkles className="size-4 text-teal-300" />
              Create your profile and start chatting instantly
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
                    <MessageSquare className="size-7" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Create account</h1>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    Build your profile, join the conversation, and step into a cleaner chat experience from day one.
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-right sm:block">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Quick setup</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-cyan-100">
                    <ShieldCheck className="size-4" />
                    Less than a minute
                  </p>
                </div>
              </div>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Profile</p>
                  <p className="mt-2 text-lg font-semibold">Personalized</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Chat</p>
                  <p className="mt-2 text-lg font-semibold">Real-time</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Privacy</p>
                  <p className="mt-2 text-lg font-semibold">Secure</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">Full name</span>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                    <input
                      type="text"
                      className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/40 pl-12 pr-4 text-white placeholder:text-white/35 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">Email address</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                    <input
                      type="email"
                      className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/40 pl-12 pr-4 text-white placeholder:text-white/35 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white/80">Password</span>
                    <span className="text-xs text-white/45">Use 6 or more characters</span>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/45" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="h-14 w-full rounded-2xl border border-white/15 bg-slate-950/40 pl-12 pr-14 text-white placeholder:text-white/35 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                      placeholder="Create a password"
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
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 px-4 font-semibold text-slate-950 transition hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
                <p>Already signed up? Jump back in and continue chatting.</p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 font-medium text-teal-300 transition hover:text-teal-200"
                >
                  Sign in
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <AuthImagePattern
          badge="New member setup"
          title="A bright, modern start for every new conversation."
          subtitle="Create your account, set your identity, and move into a chat experience that feels premium on the very first screen."
          stats={[
            { value: "1 min", label: "Easy onboarding" },
            { value: "Safe", label: "Protected account" },
            { value: "Live", label: "Instant messaging" },
          ]}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
