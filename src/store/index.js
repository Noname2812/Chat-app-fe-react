import { create } from "zustand";
import { createAuthSlice, initialAuthState } from "./slices/auth-slice";
import { createThemeSlice, initialThemeState } from "./slices/theme-slice";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createLoadingSlice,
  initialLoadingState,
} from "./slices/loading-slice";
import { createRoomSlice, initialRoomState } from "./slices/room-slice";
import {
  createVideoCallSlice,
  initialVideoCallState,
} from "./slices/video-call-slice";

const initialState = {
  ...initialAuthState,
  ...initialThemeState,
  ...initialLoadingState,
  ...initialRoomState,
  ...initialVideoCallState,
};

export const useAppStore = create(
  persist(
    (set) => ({
      ...createAuthSlice(set),
      ...createThemeSlice(set),
      ...createLoadingSlice(set),
      ...createRoomSlice(set),
      ...createVideoCallSlice(set),
      reset: () => set(initialState),
    }),
    {
      name: "chat-app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
