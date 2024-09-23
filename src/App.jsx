import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import Providers from "./providers";
import { useAppStore } from "./store";
import LoadingWhenCallApi from "./components/loading-when-call-api";
import PrivateRouteWrapper from "./providers/PrivateRouteWrapper";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";

function App() {
  const isLoadingWhenCallApi = useAppStore(
    (state) => state.isLoadingWhenCallApi
  );

  return (
    <Providers>
      {isLoadingWhenCallApi && <LoadingWhenCallApi />}
      <BrowserRouter>
        <Routes>
          <Route
            path={"/chat"}
            element={
              <PrivateRouteWrapper>
                <ChatPage />
              </PrivateRouteWrapper>
            }
          />
          <Route
            path={"/profile"}
            element={
              <PrivateRouteWrapper>
                <ProfilePage />
              </PrivateRouteWrapper>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
