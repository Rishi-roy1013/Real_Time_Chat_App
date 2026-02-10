import { MessageSquare, Sparkles, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.10),_transparent_28%)] p-8 sm:p-16">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-[28px] bg-cyan-400/10 text-cyan-300 shadow-inner">
          <MessageSquare className="size-10" />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            <Sparkles className="size-4 text-cyan-300" />
            Fresh conversation space
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Welcome to your chat workspace</h2>
          <p className="mx-auto max-w-xl text-base leading-7 text-white/65">
            Select a conversation from the left to view messages, send photos, and keep everything flowing in one clean interface.
          </p>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Users className="size-5" />
            </div>
            <h3 className="font-semibold">Pick a contact</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Open any available contact from the sidebar to start a new live chat.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <MessageSquare className="size-5" />
            </div>
            <h3 className="font-semibold">Send instantly</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Messages and image attachments appear in a cleaner, more focused layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
