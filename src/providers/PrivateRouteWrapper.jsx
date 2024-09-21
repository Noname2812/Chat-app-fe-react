import Header from "@/layout/Header";
import { HubServices } from "@/services/HubServices";
import { useAppStore } from "@/store";
import { getToken } from "@/utils/tokenHelpers";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteWrapper = ({ children }) => {
  const { user } = useAppStore();

  useEffect(() => {
    const initializeConnection = async () => {
      const token = await getToken();
      if (token?.accessToken) {
        HubServices.connection(token.accessToken);
      }
    };

    initializeConnection();
  }, []);

  if (!user) return <Navigate to="/auth" />;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PrivateRouteWrapper;
