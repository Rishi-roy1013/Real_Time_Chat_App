import { Check, MessageSquare, Send, Shield, Users } from "lucide-react";

const featureCards = [
  {
    icon: Users,
    title: "Seamless connections",
    text: "Move between personal chats and groups without losing context.",
  },
  {
    icon: Send,
    title: "Fast message delivery",
    text: "Real-time updates keep every conversation feeling immediate.",
  },
  {
    icon: Shield,
    title: "Reliable privacy",
    text: "Built for secure sign-in and protected conversations.",
  },
];

const AuthImagePattern = ({ badge, title, subtitle, stats = [] }) => {
  return (
    <div className="relative hidden overflow-hidden border-l border-white/10 bg-[radial-gradient(circle_at_20%_20%,_rgba(125,211,252,0.18),_transparent_22%),radial-gradient(circle_at_80%_30%,_rgba(45,212,191,0.18),_transparent_26%),linear-gradient(160deg,_rgba(3,7,18,0.96),_rgba(15,23,42,0.88),_rgba(8,47,73,0.95))] p-12 lg:flex lg:items-center lg:justify-center">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-12 top-12 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute bottom-12 right-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
          <MessageSquare className="size-4 text-cyan-300" />
          {badge}
        </div>

        <div className="mb-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300 to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/20">
            <MessageSquare className="size-8" />
          </div>

          <h2 className="max-w-lg text-4xl font-bold leading-tight text-white">{title}</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/68">{subtitle}</p>

          {stats.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {featureCards.map(({ icon: Icon, title: cardTitle, text }) => (
            <div
              key={cardTitle}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="mt-0.5 inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{cardTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-white/62">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-100">
            <span className="inline-flex size-8 items-center justify-center rounded-xl bg-emerald-200/15">
              <Check className="size-4" />
            </span>
            Clean onboarding, modern visuals, and a chat-first experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
