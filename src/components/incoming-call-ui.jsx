import { useAppStore } from "@/store";
import { Dialog, DialogContent } from "./ui/dialog";
import { Phone, X } from "lucide-react";

const IncomingCallComponent = () => {
  const { incomingCall, endOrRejectVideoCall } = useAppStore();
  const handleInteractOutside = (event) => {
    event.preventDefault();
  };
  const handleCloseCalling = (status) => {
    if (!status) endOrRejectVideoCall();
  };
  return (
    <Dialog open={incomingCall} onOpenChange={handleCloseCalling}>
      <DialogContent
        className="p-6 bg-white text-black max-w-[320px] rounded-lg"
        onInteractOutside={handleInteractOutside}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-between w-full ">
            <h2 className="text-lg font-semibold">Cuộc gọi đến</h2>
          </div>

          <div className="w-24 h-24 rounded-full overflow-hidden ">
            <img
              src="/public/logos/chat-app-login.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Thầm Lặng đang gọi</h3>
            <p className="text-sm text-center">cho bạn</p>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <button className="flex items-center justify-center p-4 bg-red-500 rounded-full text-white hover:bg-red-600">
              <X size={16} />
            </button>
            <button className="flex items-center justify-center p-4 bg-green-500 rounded-full text-white hover:bg-green-600">
              <Phone size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncomingCallComponent;
