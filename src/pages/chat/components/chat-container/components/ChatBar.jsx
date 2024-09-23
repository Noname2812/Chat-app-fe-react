import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { HubServices } from "@/services/HubServices";
import { useAppStore } from "@/store";
const ChatBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojPickerOpen, setEmojPickerOpen] = useState(false);
  const { user, roomSelected } = useAppStore();
  const handleAddEmoji = (emoji) => {
    setMessage((message) => message + emoji.emoji);
  };
  const handleSendMessage = () => {
    const data = {
      createBy: user.id,
      roomChatId: roomSelected.id,
      content: message,
      type: 0,
      IsGroup: roomSelected.isGroup,
    };

    // Guid CreateBy,Guid? RoomChatId, Member? To, Guid? MessageId, string Content, TypeMessage? Type, bool IsGroup, DateTimeOffset? CreateDate
    HubServices.sendMessage(data);

    setMessage("");
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
      <div className="flex-1 flex  rounded-md items-center gap-5 pr-5 bg-[#2a2b33]">
        <Input
          type="text"
          placeholder="Nhập tin nhắn"
          className="fflex-1 border-none p-6 bg-transparent text-sm text-white rounded-md focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button className="text-neutral-500 focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </Button>
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
        className="bg-[#8417ff] rounded flex items-center justify-center p-6 focus:text-white duration-300 transition-all hover:bg-[#741bda]"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </Button>
    </div>
  );
};

export default ChatBar;
