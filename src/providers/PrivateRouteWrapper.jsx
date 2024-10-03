import CallingComponent from "@/components/calling-ui";
import IncomingCallComponent from "@/components/incoming-call-ui";
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
      if (token?.accessToken && !HubServices.isConnected()) {
        HubServices.connection(token.accessToken);
      }
    };

    initializeConnection();
  }, []);

  return user ? (
    <>
      <CallingComponent />
      <IncomingCallComponent />
      {children}
    </>
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRouteWrapper;
