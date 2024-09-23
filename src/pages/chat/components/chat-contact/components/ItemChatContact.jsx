import { useAppStore } from "@/store";

const ItemChatContact = ({ avatar, name, message, onClick, id }) => {
  const roomSelected = useAppStore((state) => state.roomSelected);

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
          <p className="text-sm font-medium">{message?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemChatContact;
