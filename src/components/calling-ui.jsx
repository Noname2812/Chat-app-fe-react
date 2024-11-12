import { useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { PhoneOff, Video, MicOff } from "lucide-react";
import { HubServices } from "@/services/HubServices";
import {
  genarateRoomIdZegoCloudFromRoomChatId,
  getParticipantPrivateRoomChat,
} from "@/utils/functionHelper";
import { useEffect, useState } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { PARAMS_CREATE_TOKEN_ZEGO_CLOUD, TYPE_CALL } from "@/constants";
import dayjs from "dayjs";
import { data } from "autoprefixer";

const CallingComponent = () => {
  const { callInformation, endOrRejectVideoCall, tokenZegoCloud, user } =
    useAppStore();
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publicStream, setPublicStream] = useState(undefined);
  const [settingPublicStream, setSettingPublicStream] = useState({
    audio: true,
    camera: true,
  });
  const handleInteractOutside = (event) => {
    event.preventDefault();
  };
  const handleUpdateStream = async ({ audio, camera, update }) => {
    await zgVar.updatePublishingStream(localStream, 0);
    setSettingPublicStream({ audio, camera });
  };
  const handleOnClickCloseCalling = async (status) => {
    if (!status && zgVar && localStream && publicStream) {
      const connection = HubServices.getConnection();
      if (connection) {
        await connection.invoke("StopCallRequest", {
          caller: user?.id,
          roomChat: callInformation?.room,
        });
        handleStopCall();
      }
    }
  };
  const handleStopCall = async () => {
    endOrRejectVideoCall();
    zgVar.destroyStream(localStream);
    zgVar.stopPublishingStream(publicStream);
    await zgVar.logoutRoom(
      genarateRoomIdZegoCloudFromRoomChatId(callInformation?.room?.id)
    );
  };
  useEffect(() => {
    const startCall = async () => {
      const zg = new ZegoExpressEngine(
        PARAMS_CREATE_TOKEN_ZEGO_CLOUD.appId,
        import.meta.env.VITE_SERVER_URL
      );
      setZgVar(zg);
      zg.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList, extendData) => {
          if (updateType === "ADD") {
            const remoteVideo = document.getElementById("remote-video");
            const video = document.createElement(
              callInformation?.type === TYPE_CALL.AUDIO ? "audio" : "video"
            );
            video.id = streamList[0].streamID;
            video.autoplay = true;
            video.playsInline = true;
            video.muted = false;
            if (remoteVideo) {
              remoteVideo.appendChild(video);
            }
            zg.startPlayingStream(streamList[0].streamID, {
              audio: true,
              video: true,
            }).then((stream) => {
              video.srcObject = stream;
            });
          } else if (
            updateType === "DELETE" &&
            zg &&
            localStream &&
            streamList[0].streamID
          ) {
            zg.destroyStream(localStream);
            zg.stopPublishingStream(streamList[0].streamID);
            zg.logoutRoom(
              genarateRoomIdZegoCloudFromRoomChatId(callInformation?.room?.id)
            );
            endOrRejectVideoCall();
          }
        }
      );
      await zg.loginRoom(
        genarateRoomIdZegoCloudFromRoomChatId(callInformation?.room?.id),
        tokenZegoCloud,
        {
          userID: user?.id,
          userName: user?.name,
        },
        {
          userUpdate: true,
        }
      );
      const localVideo = await zg.createStream({
        camera: {
          ...settingPublicStream,
        },
      });
      const localAudio = document.getElementById("local-audio");
      const videoElemnt = document.createElement(
        callInformation?.type === TYPE_CALL.AUDIO ? "audio" : "video"
      );
      videoElemnt.id = "local-video-zego";
      videoElemnt.className = "w-32 h-28";
      videoElemnt.autoplay = true;
      videoElemnt.playsInline = true;
      videoElemnt.muted = false;
      localAudio.appendChild(videoElemnt);
      const td = document.getElementById("local-video-zego");
      td.srcObject = localVideo;
      const streamId = "stream_" + dayjs().unix();
      setLocalStream(localVideo);
      setPublicStream(streamId);
      zg.startPublishingStream(streamId, localVideo);
    };
    if (tokenZegoCloud && callInformation) {
      startCall();
      const connection = HubServices.getConnection();
      if (connection) {
        connection.on("EndCall", (data) => {
          handleStopCall();
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenZegoCloud, callInformation]);
  return (
    <Dialog
      open={callInformation ? true : false}
      onOpenChange={handleOnClickCloseCalling}
    >
      <DialogContent
        className="p-0 overflow-hidden bg-black text-white lg:max-w-[60vw] max-w-[90vw] h-[80vh]"
        onInteractOutside={handleInteractOutside}
      >
        <div className="flex flex-col h-full">
          <DialogHeader className={"max-h-[20%]"}>
            <DialogTitle>
              <div className="p-4 text-center">
                <div className="text-sm bg-zinc-800 text-zinc-200 rounded-full py-1 px-3 inline-block mb-4">
                  Micro và loa được kết nối: Microphone (Realtek(R) Audio)
                </div>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div
            className="flex-grow flex flex-col items-center justify-center relative"
            id="remote-video"
          >
            {!tokenZegoCloud && (
              <>
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src="/public/logos/chat-app-login.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-1">
                  {callInformation?.room?.isGroup
                    ? callInformation?.room?.name
                    : getParticipantPrivateRoomChat(
                        callInformation?.room?.conversationParticipants,
                        callInformation?.caller?.id
                      )?.appUser?.name}
                </h2>
                <p className="text-sm text-gray-400">Đang gọi.........</p>
              </>
            )}
            <div className="absolute bottom-5 right-5" id="local-audio"></div>
          </div>
          <div className="p-4 bg-zinc-900">
            <div className="flex justify-center space-x-4">
              <button
                className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600"
                onClick={() =>
                  handleUpdateStream({
                    ...settingPublicStream,
                    camera: !settingPublicStream.camera,
                    update: TYPE_CALL.VIDEO,
                  })
                }
              >
                <Video size={24} />
              </button>
              <button
                className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600"
                onClick={() =>
                  handleUpdateStream({
                    ...settingPublicStream,
                    audio: !settingPublicStream.audio,
                    update: TYPE_CALL.AUDIO,
                  })
                }
              >
                <MicOff size={24} />
              </button>
              <button
                className="p-3 rounded-full bg-red-600 hover:bg-red-700"
                onClick={() => handleOnClickCloseCalling(false)}
              >
                <PhoneOff size={24} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallingComponent;
