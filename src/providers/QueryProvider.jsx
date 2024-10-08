import { QUERY_CLINENT } from "@/constants";
import { QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={QUERY_CLINENT}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
