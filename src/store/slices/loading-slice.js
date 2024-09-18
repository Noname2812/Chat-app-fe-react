export const createLoadingSlice = (set) => ({
  isLoadingWhenCallApi: false,
  setIsLoadingWhenCallApi: (isLoading) =>
    set(() => ({
      isLoadingWhenCallApi: isLoading,
    })),
});
