export const createRoomSlice = (set) => ({
  roomSelected: undefined,
  setRoomSelected: (room) =>
    set({
      roomSelected: room,
    }),
  closeRoom: () =>
    set({
      roomSelected: undefined,
    }),
  addMessage: (message) =>
    set((state) => ({
      roomSelected: {
        ...state.roomSelected,
        messages: [...state.roomSelected.messages, message],
      },
    })),
});
