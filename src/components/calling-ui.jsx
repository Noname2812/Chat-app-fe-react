import { useAppStore } from "@/store";
import { Dialog, DialogContent } from "./ui/dialog";

import { PhoneOff, UserPlus, Video, MicOff } from "lucide-react";
const CallingComponent = () => {
  const { calling, endOrRejectVideoCall } = useAppStore();
  const handleInteractOutside = (event) => {
    event.preventDefault();
  };
  const handleCloseCalling = (status) => {
    if (!status) endOrRejectVideoCall();
  };
  return (
    <Dialog open={calling ? true : false} onOpenChange={handleCloseCalling}>
      <DialogContent
        className="p-0 overflow-hidden bg-black text-white lg:max-w-[60vw] max-w-[90vw] h-[80vh]"
        onInteractOutside={handleInteractOutside}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 text-center">
            <div className="text-sm bg-zinc-800 text-zinc-200 rounded-full py-1 px-3 inline-block mb-4">
              Micro và loa được kết nối: Microphone (Realtek(R) Audio)
            </div>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src="/public/logos/chat-app-login.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">Name</h2>
            <p className="text-sm text-gray-400">Status.........</p>
          </div>
          <div className="p-4 bg-zinc-900">
            <div className="flex justify-center space-x-4">
              <button className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600">
                <Video size={24} />
              </button>
              <button className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600">
                <MicOff size={24} />
              </button>
              <button className="p-3 rounded-full bg-red-600 hover:bg-red-700">
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
