export const initialThemeState = {
  theme: "light",
};
export const createThemeSlice = (set) => ({
  ...initialThemeState,
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
});
