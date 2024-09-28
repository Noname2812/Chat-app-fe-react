const LoadingWhenCallApi = () => {
  return (
    <div className="flex items-center justify-center bg-transparent opacity-90 absolute z-[9999] w-screen h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
export default LoadingWhenCallApi;
