export const createAuthSlice = (set) => ({
  isAuthenticated: false,
  user: undefined,
  token: undefined,
  isConnected: false,
  loginSuccess: (data) =>
    set({ isAuthenticated: true, user: { ...data.user }, token: data.token }),
  logOut: () =>
    set({ isAuthenticated: false, user: undefined, token: undefined }),
  setRefreshToken: (data) => set({ token: data }),
  setIsConnected: (isConnected) => set({ isConnected }),
});
