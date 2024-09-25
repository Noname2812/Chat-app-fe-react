import { TYPE_MESSAGE } from "@/constants";
import { useAppStore } from "@/store";

import MessageText from "./components/MessageText";
import MessageImage from "./components/MessageImage";
import MessageAudio from "./components/MessageAudio";

const ItemMessage = (props) => {
  const { content, createdBy, createdDate, type, avatar } = props;
  const user = useAppStore((state) => state.user);
  const isMyMessage = user?.id === createdBy;
  return (
    <>
      <div>
        <div
          className={`flex items-center gap-2 ${
            user?.id === createdBy ? "justify-end" : ""
          } p-2 `}
        >
          {type === TYPE_MESSAGE.TEXT && (
            <MessageText
              content={content}
              createdDate={createdDate}
              isMyMessage={isMyMessage}
            />
          )}
          {type === TYPE_MESSAGE.IMAGE && (
            <MessageImage
              content={content}
              createdDate={createdDate}
              isMyMessage={isMyMessage}
            />
          )}
          {type === TYPE_MESSAGE.AUDIO && (
            <MessageAudio
              content={content}
              createdDate={createdDate}
              isMyMessage={isMyMessage}
            />
          )}
          <div className={`${isMyMessage ? "order-2" : "order-1"}`}>
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemMessage;
