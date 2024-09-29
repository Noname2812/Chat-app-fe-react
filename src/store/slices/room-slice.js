export const initialRoomState = {
  roomSelected: undefined,
  messagesSearch: undefined,
};
export const createRoomSlice = (set) => ({
  ...initialRoomState,

  setRoomSelected: (room) =>
    set({
      roomSelected: room,
      messagesSearch: undefined,
    }),
  closeRoom: () =>
    set({
      roomSelected: undefined,
      messagesSearch: undefined,
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
  setMessagesSearch: (messages) => set({ messagesSearch: messages }),
});
