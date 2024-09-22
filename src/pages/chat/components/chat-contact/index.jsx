import { useQuery } from "@tanstack/react-query";
import Logo from "./components/Logo";
import { roomChatApi } from "@/api/roomChatApi";
import SkeletonList from "@/components/SkeletonList";

const ChatContact = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAllRoomChats"],
    queryFn: () => roomChatApi.getAll({ limit: 10, offset: 0 }),
  });

  return (
    <div className="flex-1 md:bg-slate-500 md:flex flex-col    p-2 hidden duration-100 transition border-r-2 border-white ">
      <div className="pt-3">
        <Logo />
      </div>
      {isLoading ? <SkeletonList count={10} /> : <></>}
    </div>
  );
};

export default ChatContact;
