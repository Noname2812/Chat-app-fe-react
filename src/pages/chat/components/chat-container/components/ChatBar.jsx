import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { HubServices } from "@/services/HubServices";
import { useAppStore } from "@/store";
import { uploadFile } from "@/api/uploadFile";
import { TYPE_MESSAGE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import CaptureAudio from "./CaptureAudio";
import { messageApi } from "@/api/messageApi";
import { getParticipantPrivateRoomChat } from "@/utils/functionHelper";
const ChatBar = () => {
  const emojiRef = useRef();
  const inputFileRef = useRef();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [emojPickerOpen, setEmojPickerOpen] = useState(false);
  const { user, roomSelected } = useAppStore();
  const [showAudio, setShowAudio] = useState(false);
  const handleAddEmoji = (emoji) => {
    setMessage((message) => message + emoji.emoji);
  };
  const handleSendMessage = async () => {
    if (message?.trim()?.length < 1) return;
    const toUser = roomSelected?.isGroup
      ? undefined
      : getParticipantPrivateRoomChat(
          roomSelected?.conversationParticipants,
          user.id
        ).appUser?.id;

    const data = {
      createBy: user.id,
      roomChatId: roomSelected.id,
      content: message,
      type: TYPE_MESSAGE.TEXT,
      IsGroup: roomSelected.isGroup,
      toUser: toUser,
    };
    HubServices.sendMessage(data);
    // await messageApi.create(data);

    setMessage("");
  };
  const handleOnChangeFile = async (e) => {
    const file = e.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const upLoadFileResult = await uploadFile.upload({ formData, type: 1 });
      const data = {
        createBy: user.id,
        roomChatId: roomSelected.id,
        content: upLoadFileResult?.value?.url,
        type: TYPE_MESSAGE.IMAGE,
        IsGroup: roomSelected.isGroup,
      };
      HubServices.sendMessage(data);
      // await messageApi.create(data);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Up load image failed !",
      });
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  return (
    <div className="h-[10vh] border-t-2 border-[#2f303b] flex items-center justify-center px-8 mb-6 gap-6">
      {!showAudio && (
        <>
          <div className="flex-1 flex  rounded-md items-center gap-5 pr-5 bg-[#2a2d33]">
            <Input
              type="text"
              placeholder="Nhập tin nhắn"
              className="fflex-1 border-none p-6 bg-transparent text-sm text-white rounded-md focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              className="text-neutral-500 focus:text-white duration-300 transition-all"
              onClick={() => inputFileRef.current.click()}
            >
              <LuImagePlus className="text-2xl" />
            </Button>
            <Input
              type="file"
              className="hidden"
              ref={inputFileRef}
              onChange={handleOnChangeFile}
            />
            <div className="relative">
              <Button
                className="text-neutral-500 focus:text-white duration-300 transition-all"
                onClick={() => setEmojPickerOpen(!emojPickerOpen)}
              >
                <RiEmojiStickerLine className="text-2xl" />
              </Button>
              <div className="absolute bottom-16 right-0" ref={emojiRef}>
                <EmojiPicker
                  theme="dark"
                  open={emojPickerOpen}
                  onEmojiClick={handleAddEmoji}
                  autoFocusSearch={false}
                />
              </div>
            </div>
          </div>
          <Button
            className="rounded flex items-center justify-center p-6  duration-300 transition-all hover:bg-[#741bda]"
            onClick={() => setShowAudio(true)}
          >
            <FaMicrophone size={20} />
          </Button>
          {message.length > 0 && (
            <Button
              className="bg-[#8417ff] rounded flex items-center justify-center p-6 focus:text-white duration-300 transition-all hover:bg-[#741bda]"
              onClick={handleSendMessage}
            >
              <IoSend className="text-2xl" />
            </Button>
          )}
        </>
      )}
      {showAudio && <CaptureAudio onClose={() => setShowAudio(false)} />}
    </div>
  );
};

export default ChatBar;
