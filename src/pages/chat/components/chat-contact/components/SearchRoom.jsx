import { roomChatApi } from "@/api/roomChatApi";
import { Input } from "@/components/ui/input";
import { QUERY_CLINENT } from "@/constants";
import { useState } from "react";

const SearchRoom = ({ setRooms }) => {
  const [keySearch, setKeySearch] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const debounde = (value) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(async () => {
      if (value) {
        const data = await roomChatApi.getAll({
          limit: 20,
          offset: 0,
          keySearch: value,
        });
        setRooms(data?.value?.items);
      } else
        QUERY_CLINENT.invalidateQueries({
          queryKey: ["getAllRoomChats"],
        });
    }, 1000);
    setTimeoutId(newTimeoutId);
  };
  const handleOnchangeSearch = (e) => {
    setKeySearch(e.target.value);
    debounde(e.target.value);
  };
  return (
    <div className="w-full">
      <Input
        placeholder="Search"
        className="px-4 py-6 text-sm bg-[#F0F2F5]"
        value={keySearch}
        onChange={handleOnchangeSearch}
      />
    </div>
  );
};

export default SearchRoom;
