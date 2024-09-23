import { useAppStore } from "@/store";
import ChatBar from "./components/ChatBar";
import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";
import EmptyChatContainer from "../EmptyChatContainer";

const ChatContainer = () => {
  const roomSelected = useAppStore((state) => state.roomSelected);

  return (
    <>
      {roomSelected ? (
        <div className="w-3/4 h-full flex flex-col bg-[#1c1d25]">
          <ChatHeader />
          <MessageContainer />
          <ChatBar />
        </div>
      ) : (
        <EmptyChatContainer />
      )}
    </>
  );
};

export default ChatContainer;
