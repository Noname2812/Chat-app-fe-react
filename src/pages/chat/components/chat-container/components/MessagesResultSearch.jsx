import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import {
  getCompareWithToday,
  getParticipantByIdInRoomChat,
} from "@/utils/functionHelper";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MessagesResultSearch = ({ data, loadMore }) => {
  const { ref, inView } = useInView();
  const { roomSelected } = useAppStore();
  useEffect(() => {
    if (inView && data.hasNextPage) {
      loadMore(data.pageIndex + 1);
    }
  }, [inView]);
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto custom-scroll">
      {data?.items?.length < 1 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl font-semibold">No result</p>
        </div>
      ) : (
        <div
          className={`p-2 border-b-2 border-gray-300 ${data ? "" : "hidden"}`}
        >
          <p className="text-lg font-semibold">{`Find: ${data?.totalCount} results `}</p>
        </div>
      )}
      {data?.items?.map((item) => (
        <div
          key={item.id}
          className="p-2 flex items-center gap-4 shadow-md justify-start"
        >
          <div className="bg-black rounded-full ">
            <img
              src={
                getParticipantByIdInRoomChat(
                  roomSelected?.conversationParticipants,
                  item.createdBy
                )?.appUser?.avatar
              }
              alt="avatar-create-message"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="w-4/5 flex flex-col gap-1">
            <div>
              <p className="text-sm font-bold">
                {
                  getParticipantByIdInRoomChat(
                    roomSelected?.conversationParticipants,
                    item.createdBy
                  )?.nickName
                }
              </p>
            </div>
            <div className="w-full flex justify-between">
              <div className="w-3/5">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-gray-600">
                  {item.content}
                </p>
              </div>
              <div>
                <p className="text-xs text-center">
                  {getCompareWithToday(item?.createdDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button ref={ref} className={data?.hasNextPage ? "" : "hidden"}>
        Load more
      </Button>
    </div>
  );
};

export default MessagesResultSearch;
