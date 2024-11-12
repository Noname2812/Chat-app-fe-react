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
import { HubServices } from "@/services/HubServices";
import { PARAMS_CREATE_TOKEN_ZEGO_CLOUD, TYPE_CALL } from "@/constants";

const ChatHeader = () => {
  const {
    user,
    roomSelected,
    closeRoom,
    setMessagesSearch,
    messagesSearch,
    beginOrAcceptVideoCall,
  } = useAppStore();
  const participantPrivateRoomChat = getParticipantPrivateRoomChat(
    roomSelected.conversationParticipants,
    user.id
  );
  const handleStartCall = async (type) => {
    const connection = HubServices.getConnection();
    if (connection) {
      const data = {
        params: PARAMS_CREATE_TOKEN_ZEGO_CLOUD,
        from: {
          id: user?.id,
          avatar: user?.avatar,
          name: user?.name,
        },
        roomChat: {
          id: roomSelected?.id,
          name: roomSelected?.name,
          isGroup: roomSelected?.isGroup,
          conversationParticipants: roomSelected?.conversationParticipants?.map(
            (user) => ({
              nickName: user?.nickName,
              userId: user?.appUser?.id,
              appUser: { ...user.appUser },
            })
          ),
          avatar: roomSelected?.avatar,
        },
        type: type,
      };

      await connection.invoke("CreateRequestCall", data);
      beginOrAcceptVideoCall({
        type: type,
        caller: user,
        room: {
          id: roomSelected?.id,
          name: roomSelected?.name,
          isGroup: roomSelected?.isGroup,
          conversationParticipants: roomSelected?.conversationParticipants,
          avatar: roomSelected?.avatar,
        },
      });
    }
  };
  return (
    <div className="flex-1 border-b-2 border-[#F0F0F0] flex items-center justify-between px-4 shadow-md">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black rounded-full">
          <img
            src={
              roomSelected.isGroup
                ? roomSelected?.avatar
                : participantPrivateRoomChat?.appUser?.avatar
            }
            alt="image room chat"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-semibold ">
            {roomSelected.isGroup
              ? roomSelected.name
              : participantPrivateRoomChat?.nickName}
          </div>
          {roomSelected.isGroup ? (
            <div className=" text-sm">trang thai hoat dong</div>
          ) : (
            <div className="text-sm">
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
        <Button
          className="p-4 rounded-full bg-transparent hover:bg-[#F0F0F0] shadow-none"
          onClick={() => handleStartCall(TYPE_CALL.AUDIO)}
        >
          <MdCall size={25} color="#0084FF" fontWeight={"600"} />
        </Button>
        <Button
          className="p-4 rounded-full bg-transparent hover:bg-[#F0F0F0] shadow-none"
          onClick={() => handleStartCall(TYPE_CALL.VIDEO)}
        >
          <IoVideocam size={25} color="#0084FF" fontWeight={"600"} />
        </Button>
        {!messagesSearch && (
          <Button
            onClick={() => setMessagesSearch([])}
            className="p-4 rounded-full bg-transparent hover:bg-[#F0F0F0] shadow-none"
          >
            <BiSearchAlt2 size={25} color="#0084FF" fontWeight={"600"} />
          </Button>
        )}
        <Button
          onClick={() => closeRoom()}
          className="p-4 rounded-full bg-transparent hover:bg-[#F0F0F0] shadow-none"
        >
          <RiCloseFill size={25} color="black" fontWeight={"600"} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
