import { useAppStore } from "@/store";
import ItemMessage from "../../message";

const MessageContainer = () => {
  const { user, roomSelected } = useAppStore();

  return (
    <div className="h-[80vh] overflow-y-auto scrollbar-hidden p-4 px-8">
      {roomSelected?.messages?.map((message) => (
        <ItemMessage key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessageContainer;
