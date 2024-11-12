import { HubServices } from "@/services/HubServices";
import { getToken } from "@/utils/tokenHelpers";
import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  hubContext: undefined,
  setHubContext: () => null,
};
const HubProviderContext = createContext(initialState);
export function HubProvider({ children, ...props }) {
  const [hubContext, setHubContext] = useState(undefined);
  useEffect(() => {
    const initializeConnection = async () => {
      const token = await getToken();
      if (token?.accessToken && !HubServices.isConnected()) {
        HubServices.connection(token.accessToken);
      }
    };

    initializeConnection();
  }, []);

  const value = {
    hubContext,
    setHubContext: (hub) => {
      setHubContext(hub);
    },
  };

  return (
    <HubProviderContext.Provider {...props} value={value}>
      {children}
    </HubProviderContext.Provider>
  );
}

export const useHub = () => {
  const context = useContext(HubProviderContext);
  if (context === undefined)
    throw new Error("useHub must be used within a ThemeProvider");
  return context;
};
