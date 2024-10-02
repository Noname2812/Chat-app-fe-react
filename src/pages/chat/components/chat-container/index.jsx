import { useAppStore } from "@/store";
import ChatBar from "./components/ChatBar";
import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";
import EmptyChatContainer from "../EmptyChatContainer";
import SearchMessages from "./components/SearchMessages";

const ChatContainer = () => {
  const { roomSelected, messagesSearch } = useAppStore();

  return (
    <>
      {roomSelected ? (
        <div className="w-3/4 flex">
          <div className={`flex-1 h-full flex flex-col `}>
            <ChatHeader />
            <MessageContainer />
            <ChatBar />
          </div>
          {messagesSearch && <SearchMessages />}
        </div>
      ) : (
        <EmptyChatContainer />
      )}
    </>
  );
};

export default ChatContainer;
