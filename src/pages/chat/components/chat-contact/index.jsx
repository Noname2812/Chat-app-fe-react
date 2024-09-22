import { useQuery } from "@tanstack/react-query";
import Logo from "./components/Logo";
import { roomChatApi } from "@/api/roomChatApi";
import SkeletonList from "@/components/SkeletonList";
import ItemChatContact from "./components/ItemChatContact";
import { useAppStore } from "@/store";
import { getNamePrivateRoomChat } from "@/utils/functionHelper";
import { ModeToggleTheme } from "@/components/mode-toggle";
import ChatContactHeader from "./components/ChatContactHeader";

const ChatContact = () => {
  const user = useAppStore((state) => state.user);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAllRoomChats"],
    queryFn: () => roomChatApi.getAll({ limit: 10, offset: 0 }),
  });

  return (
    <div className=" md:bg-slate-500 md:flex flex-col w-1/4 p-2 hidden duration-100 transition border-r-2 border-white gap-2">
      <ChatContactHeader />
      {isLoading ? (
        <SkeletonList count={10} />
      ) : (
        data?.value?.map((item) => (
          <ItemChatContact
            key={item.id}
            avatar={item.avatar}
            name={getNamePrivateRoomChat(
              item.conversationParticipants,
              user.id
            )}
            message={item.messages?.[0]}
          />
        ))
      )}
    </div>
  );
};

export default ChatContact;
