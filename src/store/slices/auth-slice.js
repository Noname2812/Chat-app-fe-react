export const createAuthSlice = (set) => ({
  isAuthenticated: false,
  user: null,
  loginSuccess: (data) =>
    set({ isAuthenticated: true, user: data?.user, token: data?.token }),
  logoutSuccess: () => set({ isAuthenticated: false, user: null }),
  setToken: (data) =>
    set((state) => ({ user: { ...state.user, token: data?.token } })),
});
