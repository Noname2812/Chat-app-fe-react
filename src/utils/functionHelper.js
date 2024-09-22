export const ObjectToQuery = (object) => {
  return (
    "?" +
    Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join("&")
  );
};
export const getNamePrivateRoomChat = (conversationParticipants, userId) => {
  const participant = conversationParticipants.find(
    (participant) => participant.appUser.id !== userId
  );
  return participant?.nickName || participant?.appUser?.name;
};
