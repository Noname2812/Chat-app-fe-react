const ItemChatContact = ({ avatar, name, message, onClick }) => {
  return (
    <div
      className="flex items-center gap-4 w-full bg-white shadow-xl rounded h-[10%] px-2 cursor-pointer hover:opacity-90"
      onClick={onClick}
    >
      <div className="bg-black rounded-full">
        <img src={avatar} alt="image room chat" className="w-12 h-12 " />
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
