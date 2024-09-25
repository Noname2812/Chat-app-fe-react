import dayjs from "dayjs";
import CompareTimeWithTodayAlert from "./CompareTimeWithTodayAlert";

const MessageText = ({ content, createdDate, isMyMessage }) => {
  return (
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
        <CompareTimeWithTodayAlert
          createdDate={createdDate}
          isMyMessage={isMyMessage}
        />
      </div>
    </div>
  );
};

export default MessageText;
