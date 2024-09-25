import { TYPE_MESSAGE } from "@/constants";
import { useAppStore } from "@/store";

const ItemChatContact = ({ avatar, name, message, onClick, id }) => {
  const { roomSelected, user } = useAppStore();
  const isMyMessage = user?.id === message?.createdBy;

  return (
    <div
      className={`flex items-center gap-4 w-full ${
        roomSelected?.id === id ? "bg-green-400" : "bg-white"
      }  shadow-xl rounded h-[10%] px-2 cursor-pointer hover:opacity-90`}
      onClick={onClick}
    >
      <div className="bg-black rounded-full">
        <img
          src={avatar}
          alt="image room chat"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <h3 className="text-2xl">{name}</h3>
        </div>
        <div>
          {message?.type === TYPE_MESSAGE.TEXT && (
            <p className="text-sm font-medium">
              {isMyMessage ? "You: " + message?.content : message?.content}
            </p>
          )}
          {message?.type === TYPE_MESSAGE.IMAGE && (
            <p className="text-sm font-medium">
              {isMyMessage ? "You: Image" : "Image"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemChatContact;
