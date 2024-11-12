import { useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Phone, X } from "lucide-react";
import { HubServices } from "@/services/HubServices";
import { PARAMS_CREATE_TOKEN_ZEGO_CLOUD } from "@/constants";
import { getParticipantPrivateRoomChat } from "@/utils/functionHelper";
import { useEffect, useState } from "react";

const IncomingCallComponent = () => {
  const { incomingCall, endOrRejectVideoCall, user, beginOrAcceptVideoCall } =
    useAppStore();
  const [otherPrivateRoom, setOtherPrivateRoom] = useState(undefined);

  const handleInteractOutside = (event) => {
    event.preventDefault();
  };
  const handleCloseCalling = (status) => {
    if (!status) endOrRejectVideoCall();
  };
  const handleRejectCall = async () => {
    const connection = HubServices.getConnection();
    if (connection) {
      const callInfor = {};
      await connection.invoke("RejectCall", callInfor);
    }
  };
  const handleAcceptCall = async () => {
    const connection = HubServices.getConnection();
    if (connection) {
      const callInfor = {
        params: PARAMS_CREATE_TOKEN_ZEGO_CLOUD,
        roomChat: incomingCall?.roomChat,
      };
      await connection.invoke("AcceptRequestCall", callInfor);
      beginOrAcceptVideoCall({
        room: incomingCall?.roomChat,
        type: incomingCall?.type,
      });
    }
  };
  useEffect(() => {
    if (incomingCall) {
      const other = incomingCall?.roomChat?.isGroup
        ? undefined
        : getParticipantPrivateRoomChat(
            incomingCall?.roomChat?.conversationParticipants,
            user?.id
          );

      setOtherPrivateRoom(other);
    }
  }, [incomingCall, user?.id]);
  return (
    <Dialog open={incomingCall} onOpenChange={handleCloseCalling}>
      <DialogContent
        className="p-6 bg-white text-black max-w-[320px] rounded-lg"
        onInteractOutside={handleInteractOutside}
      >
        <div className="flex flex-col items-center gap-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between w-full ">
                <h2 className="text-lg font-semibold">Cuộc gọi đến</h2>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-24 h-24 rounded-full overflow-hidden ">
            <img
              src={
                otherPrivateRoom
                  ? otherPrivateRoom?.appUser?.avatar
                  : incomingCall?.roomChat?.avatar
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{`${
              otherPrivateRoom
                ? otherPrivateRoom?.nickName
                : incomingCall?.roomChat?.name
            } đang gọi`}</h3>
            <p className="text-sm text-center">cho bạn</p>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <button
              className="flex items-center justify-center p-4 bg-red-500 rounded-full text-white hover:bg-red-600"
              onClick={handleRejectCall}
            >
              <X size={16} />
            </button>
            <button
              className="flex items-center justify-center p-4 bg-green-500 rounded-full text-white hover:bg-green-600"
              onClick={handleAcceptCall}
            >
              <Phone size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncomingCallComponent;
