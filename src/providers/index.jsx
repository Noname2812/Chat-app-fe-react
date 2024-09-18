import QueryProvider from "./QueryProvider";

const Providers = ({ children }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};
export default Providers;
