import ChatBar from "./components/ChatBar";
import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";

const ChatContainer = () => {
  return (
    <div className="w-3/4 h-full flex flex-col bg-[#1c1d25]">
      <ChatHeader />
      <MessageContainer />
      <ChatBar />
    </div>
  );
};

export default ChatContainer;
