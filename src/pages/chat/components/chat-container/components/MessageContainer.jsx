import { useAppStore } from "@/store";
import ItemMessage from "../../message";
import {
  getParticipantByIdInRoomChat,
  sortByCreatedDate,
} from "@/utils/functionHelper";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { messageApi } from "@/api/messageApi";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import SkeletonList from "@/components/SkeletonList";

const MessageContainer = () => {
  const { roomSelected, addMessage } = useAppStore();
  const { ref, inView } = useInView();
  const containerRef = useRef();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(
      ["roomChat", roomSelected?.id],
      async ({ pageParam = 0 }) => {
        const res = await messageApi.getMessages({
          roomId: roomSelected?.id,
          pageIndex: pageParam,
          pageSize: 10,
        });

        return res.value;
      },
      {
        getNextPageParam: (data) => {
          if (data.hasNextPage) return data.pageIndex + 1;
          return undefined;
        },
      }
    );
  const scrollToBottom = useCallback(() => {
    if (containerRef.current && roomSelected?.messages) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [roomSelected?.messages]);
  useEffect(() => {
    if (data) {
      const allPages = data.pages?.flatMap((page) => page);
      const allMessages = allPages?.flatMap((page) => page?.items);
      addMessage(allMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inView]);
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  return (
    <>
      <div
        className="h-[80vh] overflow-y-auto custom-scroll p-4 px-8 scroll-smooth"
        ref={containerRef}
      >
        {isLoading ? (
          <SkeletonList count={10} />
        ) : (
          <>
            {hasNextPage && (
              <div className="w-full flex justify-center">
                <Button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  className="bg-transparent text-primary hover:bg-primary hover:text-white"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load Newer"
                    : "Nothing more to load"}
                </Button>
              </div>
            )}
            {sortByCreatedDate(roomSelected?.messages)?.map((message) => (
              <ItemMessage
                key={message.id}
                {...message}
                avatar={
                  getParticipantByIdInRoomChat(
                    roomSelected?.conversationParticipants,
                    message.createdBy
                  )?.appUser?.avatar
                }
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MessageContainer;
