export const createLoadingSlice = (set) => ({
  isLoadingWhenCallApi: false,
  isRefreshingToken: false,
  setIsLoadingWhenCallApi: (isLoading) =>
    set(() => ({
      isLoadingWhenCallApi: isLoading,
    })),
  setIsRefreshingToken: (isRefreshing) =>
    set(() => ({
      isRefreshingToken: isRefreshing,
    })),
});
