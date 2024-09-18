import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import Providers from "./providers";
import Header from "./layout/Header";

function App() {
  return (
    <Providers>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
