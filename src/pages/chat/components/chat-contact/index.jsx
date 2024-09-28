import { useQuery } from "@tanstack/react-query";
import { roomChatApi } from "@/api/roomChatApi";
import SkeletonList from "@/components/SkeletonList";
import ItemChatContact from "./components/ItemChatContact";
import { useAppStore } from "@/store";
import ChatContactHeader from "./components/ChatContactHeader";
import {
  getAvatarInRoomChat,
  getParticipantPrivateRoomChat,
} from "@/utils/functionHelper";

const ChatContact = () => {
  const { user, setRoomSelected } = useAppStore();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["getAllRoomChats"],
    queryFn: () => roomChatApi.getAll({ limit: 10, offset: 0 }),
    enabled: !!user,
    onError: (error) => {
      console.error("Query failed:", error);
    },
  });

  return (
    <div className=" md:bg-slate-500 md:flex flex-col w-1/4 p-2 hidden duration-100 transition border-r-2 border-white gap-2">
      <ChatContactHeader />

      {isLoading ? (
        <SkeletonList count={10} />
      ) : (
        data?.value?.items?.map((item) => (
          <ItemChatContact
            onClick={() => {
              setRoomSelected(item);
            }}
            key={item.id}
            id={item.id}
            avatar={
              item.isGroup
                ? item.avatar
                : getAvatarInRoomChat(item.conversationParticipants, user.id)
            }
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
