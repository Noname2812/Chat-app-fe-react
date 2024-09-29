export const initialAuthState = {
  isAuthenticated: false,
  user: undefined,
  token: undefined,
};
export const createAuthSlice = (set) => ({
  ...initialAuthState,
  loginSuccess: (data) =>
    set({ isAuthenticated: true, user: { ...data.user }, token: data.token }),
  setRefreshToken: (data) => set({ token: data }),
});
