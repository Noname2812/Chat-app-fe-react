import dayjs from "dayjs";

export const ObjectToQuery = (object) => {
  return (
    "?" +
    Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
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
export const getAvatarInRoomChat = (participants, userId) => {
  const participant = participants.find(
    (participant) => participant.appUser.id === userId
  );
  return participant?.appUser?.avatar;
};
export const formatTimeRecord = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")} :${seconds
    .toString()
    .padStart(2, "0")}`;
};
