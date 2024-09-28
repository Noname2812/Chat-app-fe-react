import LoadingWhenCallApiProvider from "./LoadingWhenCallApiProvider";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }) => {
  return (
    <QueryProvider>
      <LoadingWhenCallApiProvider>{children}</LoadingWhenCallApiProvider>
    </QueryProvider>
  );
};
export default Providers;
