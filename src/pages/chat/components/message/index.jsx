import { useAppStore } from "@/store";
import {
  getAvatarInRoomChat,
  getCompareWithToday,
} from "@/utils/functionHelper";
import dayjs from "dayjs";

const ItemMessage = (props) => {
  const { content, createdBy, createdDate, id, roomChatId, seenBys, type } =
    props;
  const user = useAppStore((state) => state.user);
  const roomSelected = useAppStore((state) => state.roomSelected);

  return (
    <>
      <div className="relative group">
        <div
          className={`flex items-center gap-2 ${
            user?.id === createdBy ? "justify-end" : ""
          } p-2 `}
        >
          <div
            style={{
              maxWidth: "75%",
              wordBreak: "break-word",
            }}
            className={`p-2 rounded ${
              user?.id === createdBy ? "bg-blue-400 " : ""
            } shadow-xl`}
          >
            <div
              style={{
                wordBreak: "break-word",
              }}
            >
              <p className="text-start">{`${content}`}</p>
              <p style={{ fontSize: "10px" }} className="text-end">{`${dayjs(
                createdDate
              ).format("HH:mm")}`}</p>
            </div>
          </div>
          <div>
            <img
              src={getAvatarInRoomChat(
                roomSelected?.conversationParticipants,
                createdBy
              )}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>
        <div className="absolute top-[110%] right-0 hidden group-hover:block bg-white p-2 rounded shadow-sm z-[9999]">
          <p className="text-sm ">{getCompareWithToday(createdDate)}</p>
        </div>
      </div>
    </>
  );
};

export default ItemMessage;
