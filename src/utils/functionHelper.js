import dayjs from "dayjs";

export const ObjectToQuery = (object) => {
  return (
    "?" +
    Object.keys(object)
      .filter((key) => object[key] !== undefined)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
      )
      .join("&")
  );
};
export const getParticipantPrivateRoomChat = (
  conversationParticipants,
  userId
) => {
  const participant = conversationParticipants.find(
    (participant) => participant.appUser.id !== userId
  );
  return participant;
};
export const convertStringToDateTime = (date) => {
  return dayjs(date).format("DD MM YY HH:mm:ss");
};
export const getCompareWithToday = (time) => {
  const targetTime = dayjs(time);
  const currentTime = dayjs();
  const differenceInMinutes = currentTime.diff(targetTime, "minute");
  if (differenceInMinutes < 60) {
    return differenceInMinutes === 0
      ? "just now"
      : differenceInMinutes + " minutes ago";
  }
  const differenceInHours = currentTime.diff(targetTime, "hour");
  if (differenceInHours < 24) {
    return differenceInHours + " hours ago";
  }
  const differenceInDays = currentTime.diff(targetTime, "day");
  return differenceInDays + " days ago";
};
export const getParticipantByIdInRoomChat = (participants, userId) => {
  const participant = participants.find(
    (participant) => participant.appUser.id === userId
  );
  return participant;
};
export const formatTimeRecord = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")} :${seconds
    .toString()
    .padStart(2, "0")}`;
};
export const sortByCreatedDate = (data) => {
  return data.sort(
    (a, b) => dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf()
  );
};
export const meregeMessages = (a, b) => {
  const currentMessages = [...(a || []), b].flatMap((page) => page);
  const result = [
    ...new Map(currentMessages.map((item) => [item.id, item])).values(),
  ];
  return sortByCreatedDate(result);
};
