import { getCompareWithToday } from "@/utils/functionHelper";

const CompareTimeWithTodayAlert = ({ createdDate, isMyMessage }) => {
  return (
    <div
      className={`absolute bottom-0 ${
        !isMyMessage ? "left-[105%]" : "right-[105%]"
      } hidden group-hover:block bg-white p-2 rounded shadow-sm z-[9999] w-28 `}
    >
      <p className="text-sm text-center">{getCompareWithToday(createdDate)}</p>
    </div>
  );
};

export default CompareTimeWithTodayAlert;
