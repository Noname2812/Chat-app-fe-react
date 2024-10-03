import { friendApi } from "@/api/friendApi";
import SkeletonList from "@/components/SkeletonList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState } from "react";

const DialogAddFriend = ({ isOpen, onClose }) => {
  const [keySearch, setKeySearch] = useState("");
  const [debouncedSearchTerm] = useDebounce(keySearch, 1000);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllFriends", debouncedSearchTerm],
    queryFn: () =>
      friendApi.getAllFriends({
        limit: 20,
        offset: 0,
        keySearch: debouncedSearchTerm,
      }),
    onError: (error) => {
      console.error("Query failed:", error);
    },
  });
  const handleOnchange = (e) => {
    setKeySearch(e.target.value);
  };

  return (
    <Dialog onOpenChange={onClose} className="w-[20vh] h-[60vh]" open={isOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[40vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add new friend</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-2">
          <Input
            placeholder="Search contact"
            className="px-4"
            value={keySearch}
            onChange={handleOnchange}
          />
        </div>
        <div className="w-full">
          {isLoading ? (
            <SkeletonList count={data?.value?.items?.length || 1} />
          ) : (
            <>
              {(data.value?.items && data.value?.items?.length) > 0 ? (
                data.value?.items?.map((item) => (
                  <div className="flex gap-2 items-center" key={item?.id}>
                    <div className="rounded-full">
                      <img
                        src={item?.avatar}
                        alt="avtar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{item?.name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-lg font-semibold text-center">No result</p>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFriend;
