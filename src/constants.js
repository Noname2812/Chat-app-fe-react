import { QueryClient } from "@tanstack/react-query";

export const QUERY_CLINENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tắt refetch khi focus lại vào window
      retry: 1, // Số lần thử lại khi query thất bại
      staleTime: 5 * 60 * 1000, // Thời gian data được coi là "fresh" (5 phút)
    },
  },
});
export const TYPE_MESSAGE = {
  TEXT: 0,
  IMAGE: 1,
  AUDIO: 2,
};
export const PARAMS_CREATE_TOKEN_ZEGO_CLOUD = {
  appId: Number(import.meta.env.VITE_APP_ID_ZEGOCLOUD),
  secret: import.meta.env.VITE_SECRET_ZEGOCLOUD,
  effectiveTimeInSeconds: 3600,
  payload: "",
};
export const STATUS_CALL = {
  WAITING: 0,
  CALLING: 1,
  REJECTED: 2,
  CANCELED: 3,
  ENDED: 4,
};
export const TYPE_CALL = {
  VIDEO: 0,
  AUDIO: 1,
};
