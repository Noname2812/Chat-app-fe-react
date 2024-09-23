import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const OpenListContacts = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Open list contacts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[40vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-2">
          <Input placeholder="Search contact" className="px-4" />
        </div>
        <div>{/* show list contact */}</div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenListContacts;
