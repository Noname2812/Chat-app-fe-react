export const initialLoadingState = {
  isRefreshingToken: false,
};
export const createLoadingSlice = (set) => ({
  ...initialLoadingState,
  setIsRefreshingToken: (isRefreshing) =>
    set(() => ({
      isRefreshingToken: isRefreshing,
    })),
});
