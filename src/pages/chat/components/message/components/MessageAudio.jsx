import CompareTimeWithTodayAlert from "./CompareTimeWithTodayAlert";

const MessageAudio = ({ content, createdDate, isMyMessage }) => {
  return (
    <div className={`relative group ${isMyMessage ? " order-1" : "order-2 "}`}>
      <audio controls>
        <source src={content} type="audio/webm" />
      </audio>
      <CompareTimeWithTodayAlert
        createdDate={createdDate}
        isMyMessage={isMyMessage}
      />
    </div>
  );
};

export default MessageAudio;
