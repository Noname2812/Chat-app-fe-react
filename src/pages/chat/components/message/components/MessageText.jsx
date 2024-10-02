import dayjs from "dayjs";
import CompareTimeWithTodayAlert from "./CompareTimeWithTodayAlert";

const MessageText = ({ content, createdDate, isMyMessage }) => {
  return (
    <div
      style={{
        maxWidth: "75%",
        wordBreak: "break-word",
      }}
      className={`rounded-xl ${
        isMyMessage
          ? "order-1 bg-[#0084FF] text-white"
          : "order-2 bg-[#F0F0F0] dark:bg-[#303030] "
      } shadow-xl `}
    >
      <div
        style={{
          wordBreak: "break-word",
        }}
        className="relative group px-4 py-1"
      >
        <p className="text-start text-lg">{`${content}`}</p>
        <p style={{ fontSize: "12px" }} className="text-end">{`${dayjs(
          createdDate
        ).format("HH:mm")}`}</p>
        <CompareTimeWithTodayAlert
          createdDate={createdDate}
          isMyMessage={isMyMessage}
        />
      </div>
    </div>
  );
};

export default MessageText;
