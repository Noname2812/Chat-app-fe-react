import Header from "@/layout/Header";
import { useAppStore } from "@/store";
import { Navigate } from "react-router-dom";

const PrivateRouteWrapper = ({ children }) => {
  const { user } = useAppStore();

  if (!user) return <Navigate to="/auth" />;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PrivateRouteWrapper;
