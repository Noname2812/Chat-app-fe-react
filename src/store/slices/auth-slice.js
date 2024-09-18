export const createAuthSlice = (set) => ({
  isAuthenticated: false,
  user: null,
  login: (data) =>
    set({ isAuthenticated: true, user: data?.user, token: data?.token }),
  logout: () => set({ isAuthenticated: false, user: null }),
  setToken: (data) =>
    set((state) => ({ user: { ...state.user, token: data?.token } })),
});
