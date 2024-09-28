import LoadingWhenCallApi from "@/components/loading-when-call-api";
import { useIsMutating } from "@tanstack/react-query";

const LoadingWhenCallApiProvider = ({ children }) => {
  const isMutating = useIsMutating();
  return isMutating ? <LoadingWhenCallApi /> : children;
};

export default LoadingWhenCallApiProvider;
