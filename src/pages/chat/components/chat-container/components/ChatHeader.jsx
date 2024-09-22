import { useAppStore } from "@/store";

const ChatHeader = () => {
  const room = useAppStore((state) => state.roomSelected);
  return (
    <div className="flex-1  border-b-2 border-[#2f303b] flex items-center justify-between px-4">
      <div className="flex flex-col gap-2">
        <div className="text-2xl text-white">{room?.name || "Room chat"}</div>
        <div className="text-white text-sm">trang thai hoat dong</div>
      </div>
      <div></div>
    </div>
  );
};

export default ChatHeader;
