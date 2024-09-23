import { useAppStore } from "@/store";
import { getParticipantPrivateRoomChat } from "@/utils/functionHelper";

const ChatHeader = () => {
  const { user, roomSelected } = useAppStore();
  return (
    <div className="flex-1  border-b-2 border-[#2f303b] flex items-center justify-between px-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black rounded-full">
          <img
            src={
              roomSelected.isGroup
                ? roomSelected?.avatar
                : getParticipantPrivateRoomChat(
                    roomSelected.conversationParticipants,
                    user.id
                  ).appUser?.avatar
            }
            alt="image room chat"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl text-white">
            {roomSelected.isGroup
              ? roomSelected.name
              : getParticipantPrivateRoomChat(
                  roomSelected.conversationParticipants,
                  user.id
                )?.nickName}
          </div>
          <div className="text-white text-sm">trang thai hoat dong</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChatHeader;
