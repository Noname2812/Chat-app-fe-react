import { friendApi } from "@/api/friendApi";
import { userApi } from "@/api/userApi";
import SkeletonList from "@/components/SkeletonList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QUERY_CLINENT } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DiaLogListContacts = () => {
  const [dataDisplay, setDataDisplay] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllFriends"],
    queryFn: () =>
      friendApi.getAllFriends({
        limit: 20,
        offset: 0,
      }),
    onError: (error) => {
      console.error("Query failed:", error);
    },
  });
  const handleOnchange = (e) => {
    setKeySearch(e.target.value);
    debounde(e.target.value);
  };
  const debounde = (value) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(async () => {
      if (value) {
        const res = await userApi.searchContact({
          limit: 20,
          offset: 0,
          keySearch: value,
        });
        console.log("res", res);
      } else QUERY_CLINENT.invalidateQueries({ queryKey: ["getAllFriends"] });
    }, 1000);
    setTimeoutId(newTimeoutId);
  };
  const handleOnOpenChange = (isOpen) => {};
  useEffect(() => {
    setDataDisplay(data?.value?.items);
  }, [data]);
  return (
    <Dialog onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Open list contacts</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[40vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List contacts</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-2">
          <Input
            placeholder="Search contact"
            className="px-4"
            value={keySearch}
            onChange={handleOnchange}
          />
        </div>
        <div>{isLoading ? <SkeletonList count={5} /> : <></>}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DiaLogListContacts;
