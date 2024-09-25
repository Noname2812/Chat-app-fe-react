import CompareTimeWithTodayAlert from "./CompareTimeWithTodayAlert";

const MessageImage = ({ content, createdDate, isMyMessage }) => {
  return (
    <div className={`relative group  ${isMyMessage ? " order-1" : "order-2 "}`}>
      <img
        src={content}
        alt={`mesage-image` + createdDate}
        width={300}
        height={300}
      />
      <CompareTimeWithTodayAlert
        createdDate={createdDate}
        isMyMessage={isMyMessage}
      />
    </div>
  );
};

export default MessageImage;
