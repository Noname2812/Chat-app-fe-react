import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createThemeSlice } from "./slices/theme-slice";
import { persist, createJSONStorage } from "zustand/middleware";
import { createLoadingSlice } from "./slices/loading-slice";
export const useAppStore = create(
  persist(
    (set) => ({
      ...createAuthSlice(set),
      ...createThemeSlice(set),
      ...createLoadingSlice(set),
    }),
    {
      name: "chat-app-storage",
      storage: createJSONStorage(() => localStorage), // sử dụng localStorage
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);
