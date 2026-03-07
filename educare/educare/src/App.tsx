import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import "./auth.css";
import Home from "./pages/Home";
import KindergartenDetails from "./pages/Details";
import RegisterChild from "./pages/RegisterChild";
import ChildrenList from "./pages/ChildrenList";
import PaymentsReport from "./pages/PaymentsReport";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

type AppLayoutProps = {
  onLogout: () => void;
};

const AppLayout = ({ onLogout }: AppLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="top-nav-wrap">
        <nav className="top-nav">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Hap menune"
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
            <span />
            <span />
            <span />
          </button>

          <NavLink to="/" className="brand">
            EduCare
          </NavLink>
        </nav>
      </header>

      <div
        className={isMenuOpen ? "menu-overlay open" : "menu-overlay"}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside className={isMenuOpen ? "side-menu open" : "side-menu"}>
        <h3>Menu</h3>
        <div className="side-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
          <NavLink to="/details" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Detajet
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Regjistro
          </NavLink>
          <NavLink to="/children" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Lista
          </NavLink>
          <NavLink to="/payments" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Raport Pagesash
          </NavLink>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Dil
          </button>
        </div>
      </aside>

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<KindergartenDetails />} />
          <Route path="/register" element={<RegisterChild />} />
          <Route path="/children" element={<ChildrenList />} />
          <Route path="/payments" element={<PaymentsReport />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(localStorage.getItem("auth_token")));

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("auth_token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/*"
          element={isAuthenticated ? <AppLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
