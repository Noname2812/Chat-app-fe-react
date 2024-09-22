import { useAppStore } from "@/store";
import DialogVertifyAccount from "./components/DialogVertifyAccount";
import ChatContainer from "./components/chat-container";
import ChatContact from "./components/chat-contact";

const ChatPage = () => {
  const { user } = useAppStore((state) => state.user);

  return (
    <>
      <DialogVertifyAccount isOpen={user?.isVertifyAccount} />
      <div className="w-full h-[100vh] overflow-hidden  flex">
        <ChatContact />
        <ChatContainer />
      </div>
    </>
  );
};

export default ChatPage;
