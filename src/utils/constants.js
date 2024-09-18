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
