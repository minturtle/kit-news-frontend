import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Callback from "./pages/LoginPage/components/KakaoCallback";
import CertificationPage from "./pages/CertificationPage/CertificationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/certificate" element={<CertificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
