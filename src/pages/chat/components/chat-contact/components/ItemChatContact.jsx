import { TYPE_MESSAGE } from "@/constants";
import { useAppStore } from "@/store";

const ItemChatContact = ({ avatar, name, message, onClick, id }) => {
  const { roomSelected, user } = useAppStore();
  const isMyMessage = user?.id === message?.createdBy;
  const handleSelectedRoom = (id) => {
    if (roomSelected?.id !== id) {
      onClick();
    }
  };
  return (
    <div
      className={`flex items-center gap-4 py-4 w-full ${
        roomSelected?.id === id ? "bg-[#EBF5FF] dark:bg-[#232E3B]" : ""
      }  shadow-xl rounded h-[10%] px-2 cursor-pointer hover:opacity-90 w-full `}
      onClick={() => handleSelectedRoom(id)}
    >
      <div className="bg-black rounded-full">
        <img
          src={avatar}
          alt="image room chat"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1 w-3/5 px-1">
        <div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
        <div className="w-full">
          {message?.type === TYPE_MESSAGE.TEXT && (
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-sm ">
              {isMyMessage ? "You: " + message?.content : message?.content}
            </p>
          )}
          {message?.type === TYPE_MESSAGE.IMAGE && (
            <p className="text-sm font-medium">
              {isMyMessage ? "You: Image" : "Image"}
            </p>
          )}
          {message?.type === TYPE_MESSAGE.AUDIO && (
            <p className="text-sm font-medium">
              {isMyMessage ? "You: Audio" : "Audio"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemChatContact;
