import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import PrivateRouteWrapper from "./providers/PrivateRouteWrapper";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import Providers from "./providers";

function App() {
  return (
    <Providers>
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
