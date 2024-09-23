import { useQuery } from "@tanstack/react-query";
import { roomChatApi } from "@/api/roomChatApi";
import SkeletonList from "@/components/SkeletonList";
import ItemChatContact from "./components/ItemChatContact";
import { useAppStore } from "@/store";
import ChatContactHeader from "./components/ChatContactHeader";
import OpenListContacts from "./components/OpenListContact";
import { getParticipantPrivateRoomChat } from "@/utils/functionHelper";

const ChatContact = () => {
  const user = useAppStore((state) => state.user);
  const selectedRoom = useAppStore((state) => state.selectedRoom);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAllRoomChats"],
    queryFn: () => roomChatApi.getAll({ limit: 10, offset: 0 }),
    enabled: !!user,
  });

  return (
    <div className=" md:bg-slate-500 md:flex flex-col w-1/4 p-2 hidden duration-100 transition border-r-2 border-white gap-2">
      <ChatContactHeader />
      <div className="w-full">
        <OpenListContacts />
      </div>
      {isLoading ? (
        <SkeletonList count={10} />
      ) : (
        data?.value?.map((item) => (
          <ItemChatContact
            onClick={() => {
              selectedRoom(item);
            }}
            key={item.id}
            avatar={item.avatar}
            name={
              item.isGroup
                ? item.name
                : getParticipantPrivateRoomChat(
                    item.conversationParticipants,
                    user.id
                  )?.nickName
            }
            message={item.messages?.[0]}
          />
        ))
      )}
    </div>
  );
};

export default ChatContact;
