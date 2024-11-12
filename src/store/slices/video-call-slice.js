export const initialVideoCallState = {
  incomingCall: undefined,
  callInformation: undefined,
  tokenZegoCloud: undefined,
};
export const createVideoCallSlice = (set) => ({
  ...initialVideoCallState,
  setIncomingCall: (incomingCall) => set({ incomingCall }),
  endOrRejectVideoCall: () =>
    set({ callInformation: undefined, incomingCall: undefined }),
  beginOrAcceptVideoCall: ({ type, caller, room, status }) =>
    set({
      callInformation: { type, caller, room, status },
      incomingCall: undefined,
    }),
  setTokenZegoCloud: (token) => set({ tokenZegoCloud: token }),
});
