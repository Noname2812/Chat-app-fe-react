import SkeletonList from "@/components/SkeletonList";
import SearchRoom from "../components/SearchRoom";
import ItemChatContact from "../components/ItemChatContact";
import {
  getParticipantByIdInRoomChat,
  getParticipantPrivateRoomChat,
} from "@/utils/functionHelper";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { roomChatApi } from "@/api/roomChatApi";

const TabsListRoomChat = () => {
  const { user, setRoomSelected } = useAppStore();
  const [rooms, setRooms] = useState([]);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["getAllRoomChats"],
    queryFn: () => roomChatApi.getAll({ limit: 20, offset: 0 }),
    enabled: !!user,
    onError: (error) => {
      console.error("Query failed:", error);
    },
  });
  useEffect(() => {
    if (data?.value?.items && isFetching === false) {
      setRooms(data?.value?.items);
    }
  }, [data?.value?.items, isFetching]);
  return (
    <div className="duration-100 transition flex flex-col gap-1 ">
      <SearchRoom setRooms={(rooms) => setRooms(rooms)} />
      {isLoading ? (
        <SkeletonList count={10} />
      ) : (
        rooms.map((item) => (
          <ItemChatContact
            onClick={() => {
              setRoomSelected(item);
            }}
            key={item.id}
            id={item.id}
            avatar={
              item.isGroup
                ? item.avatar
                : getParticipantByIdInRoomChat(
                    item.conversationParticipants,
                    user.id
                  )?.appUser?.avatar
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

export default TabsListRoomChat;
