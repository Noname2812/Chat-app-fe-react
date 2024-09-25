import { useAppStore } from "@/store";
import { getCompareWithToday } from "@/utils/functionHelper";
import dayjs from "dayjs";

const ItemMessage = (props) => {
  const {
    content,
    createdBy,
    createdDate,
    id,
    roomChatId,
    seenBys,
    type,
    avatar,
  } = props;
  const user = useAppStore((state) => state.user);
  const isMyMessage = user?.id === createdBy;
  return (
    <>
      <div>
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
              isMyMessage ? " order-1" : "order-2 "
            } shadow-xl bg-blue-400`}
          >
            <div
              style={{
                wordBreak: "break-word",
              }}
              className="relative group"
            >
              <p className="text-start">{`${content}`}</p>
              <p style={{ fontSize: "10px" }} className="text-end">{`${dayjs(
                createdDate
              ).format("HH:mm")}`}</p>
              <div className="absolute top-[110%] right-0 hidden group-hover:block bg-white p-2 rounded shadow-sm z-[9999] w-28">
                <p className="text-sm text-center">
                  {getCompareWithToday(createdDate)}
                </p>
              </div>
            </div>
          </div>
          <div className={`${isMyMessage ? "order-2" : "order-1"}`}>
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemMessage;
