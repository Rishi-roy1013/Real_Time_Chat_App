import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.12),_transparent_24%),linear-gradient(135deg,_#020617,_#0f172a_48%,_#172554)] px-4 pb-6 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto h-[calc(100vh-7.5rem)] w-full max-w-7xl">
        <div className="flex h-full overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/45 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
          <div className="flex h-full w-full overflow-hidden rounded-[30px]">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
