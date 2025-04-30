import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Menu from "./components/Menu.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import OrdersPage from "./components/OrdersPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import LocationPage from "./components/LocationPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const App = () => (
  <AuthProvider>
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-zinc-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default App;