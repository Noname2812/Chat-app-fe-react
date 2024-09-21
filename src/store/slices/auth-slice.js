export const createAuthSlice = (set) => ({
  isAuthenticated: false,
  user: undefined,
  loginSuccess: (data) =>
    set({ isAuthenticated: true, user: { ...data.user, token: data.token } }),
  logOut: () => set({ isAuthenticated: false, user: undefined }),
  setRefreshToken: (data) =>
    set((state) => ({
      user: { ...state.user, token: data },
    })),
});
