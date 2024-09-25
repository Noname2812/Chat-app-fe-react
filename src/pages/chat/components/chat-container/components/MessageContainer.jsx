import { useAppStore } from "@/store";
import ItemMessage from "../../message";
import dayjs from "dayjs";
import { getAvatarInRoomChat } from "@/utils/functionHelper";

const MessageContainer = () => {
  const { roomSelected } = useAppStore();
  const messages = roomSelected?.messages.sort(
    (a, b) => dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf()
  );
  return (
    <div className="h-[80vh] overflow-y-auto custom-scroll p-4 px-8">
      {messages?.map((message) => (
        <ItemMessage
          key={message.id}
          {...message}
          avatar={getAvatarInRoomChat(
            roomSelected?.conversationParticipants,
            message.createdBy
          )}
        />
      ))}
    </div>
  );
};

export default MessageContainer;
