import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import {
  getCompareWithToday,
  getParticipantPrivateRoomChat,
} from "@/utils/functionHelper";
import { IoVideocam } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdCall } from "react-icons/md";

const ChatHeader = () => {
  const { user, roomSelected, closeRoom } = useAppStore();
  const participantPrivateRoomChat = getParticipantPrivateRoomChat(
    roomSelected.conversationParticipants,
    user.id
  );

  return (
    <div className="flex-1  border-b-2 border-[#2f303b] flex items-center justify-between px-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black rounded-full">
          <img
            src={
              roomSelected.isGroup
                ? roomSelected?.avatar
                : participantPrivateRoomChat.appUser?.avatar
            }
            alt="image room chat"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl text-white">
            {roomSelected.isGroup
              ? roomSelected.name
              : participantPrivateRoomChat?.nickName}
          </div>
          {roomSelected.isGroup ? (
            <div className="text-white text-sm">trang thai hoat dong</div>
          ) : (
            <div className="text-white text-sm">
              {participantPrivateRoomChat?.appUser?.isOnline
                ? "Online"
                : "Offline " +
                  getCompareWithToday(
                    participantPrivateRoomChat?.appUser?.lastOnline
                  )}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button>
          <MdCall size={20} />
        </Button>
        <Button>
          <IoVideocam size={20} />
        </Button>
        <Button>
          <BiSearchAlt2 size={20} />
        </Button>
        <Button onClick={() => closeRoom()}>
          <RiCloseFill size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
