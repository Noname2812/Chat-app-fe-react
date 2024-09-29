import { messageApi } from "@/api/messageApi";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import MessagesResultSearch from "./MessagesResultSearch";

const SearchMessages = () => {
  const { setMessagesSearch, roomSelected } = useAppStore();
  const [keySearch, setKeySearch] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [resultSearch, setResultSearch] = useState(undefined);
  const debounde = (value) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(async () => {
      const data = await messageApi.getMessages({
        keySearch: value,
        roomId: roomSelected?.id,
        pageSize: 20,
      });

      setResultSearch(data.value);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };
  const handleSearch = (e) => {
    setKeySearch(e.target.value);
    if (e.target.value.length > 0) {
      debounde(e.target.value);
    }
  };
  const loadMore = async (pageIndex) => {
    const data = await messageApi.getMessages({
      keySearch: keySearch,
      roomId: roomSelected?.id,
      pageSize: 20,
      pageIndex: pageIndex,
    });
    setResultSearch((prev) => {
      return {
        ...data.value,
        items: [...prev.items, ...data.value.items],
      };
    });
  };
  return (
    <div className="flex-2 w-1/3 flex flex-col h-full">
      <div className="flex gap-4 items-center py-2 px-4 shadow-xl">
        <RiCloseFill
          onClick={() => setMessagesSearch(undefined)}
          size={30}
          className="cursor-pointer hover:opacity-80"
        />
        <Input
          placeholder="Search messages"
          value={keySearch}
          onChange={handleSearch}
        />
      </div>
      <MessagesResultSearch
        data={resultSearch}
        loadMore={(pageIndex) => loadMore(pageIndex)}
      />
    </div>
  );
};

export default SearchMessages;
