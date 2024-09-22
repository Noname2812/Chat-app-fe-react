export const createRoomSlice = (set) => ({
  roomSelected: undefined,
  selecteRoom: (room) =>
    set({
      roomSelected: room,
    }),
});
