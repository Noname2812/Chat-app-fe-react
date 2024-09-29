export const initialRoomState = {
  roomSelected: undefined,
};
export const createRoomSlice = (set) => ({
  ...initialRoomState,
  setRoomSelected: (room) =>
    set({
      roomSelected: room,
    }),
  closeRoom: () =>
    set({
      roomSelected: undefined,
    }),
  addMessage: (message) =>
    set((state) => {
      const currentMessages = [
        ...(state.roomSelected?.messages || []),
        message,
      ].flatMap((page) => page);

      return {
        ...state,
        roomSelected: {
          ...state.roomSelected,
          messages: [
            ...new Map(currentMessages.map((item) => [item.id, item])).values(),
          ],
        },
      };
    }),
});
