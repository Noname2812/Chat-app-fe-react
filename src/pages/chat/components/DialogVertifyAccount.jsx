import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRef } from "react";

const DialogVertifyAccount = ({ isOpen }) => {
  const ref = useRef(null);
  const handleVertifyAccount = () => {
    const otpValue = ref.current ? ref.current.value : "";
    console.log("Entered OTP:", otpValue);
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Vertify account</DialogTitle>
          <DialogDescription>
            Please check your email. We sent 6 numbers code to vertify your
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <InputOTP maxLength={6} ref={ref}>
            <InputOTPGroup className="flex gap-2">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter>
          <Button onClick={handleVertifyAccount}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVertifyAccount;
