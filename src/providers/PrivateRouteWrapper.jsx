import { HubServices } from "@/services/HubServices";
import { useAppStore } from "@/store";
import { getToken } from "@/utils/tokenHelpers";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteWrapper = ({ children }) => {
  const user = useAppStore((state) => state.user);
  useEffect(() => {
    const initializeConnection = async () => {
      const token = await getToken();
      if (token?.accessToken && !HubServices.isConnected()) {
        HubServices.connection(token.accessToken);
      }
    };

    initializeConnection();
  }, []);

  return user ? children : <Navigate to="/auth" />;
};

export default PrivateRouteWrapper;
