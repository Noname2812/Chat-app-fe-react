export const createLoadingSlice = (set) => ({
  isRefreshingToken: false,
  setIsRefreshingToken: (isRefreshing) =>
    set(() => ({
      isRefreshingToken: isRefreshing,
    })),
});
