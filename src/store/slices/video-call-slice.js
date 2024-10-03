export const initialVideoCallState = {
  calling: undefined,
  incomingCall: false,
};
export const createVideoCallSlice = (set) => ({
  ...initialVideoCallState,
  setIncomingCall: (incomingCall) => set({ incomingCall }),
  endOrRejectVideoCall: () => set({ calling: undefined, incomingCall: false }),
  beginOrAcceptVideoCall: ({ type, caller, room }) =>
    set({ calling: { type, caller, room }, isIncomingCall: false }),
});
