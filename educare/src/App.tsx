import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import KindergartenDetails from "./pages/Details";
import RegisterChild from "./pages/RegisterChild";
import ChildrenList from "./pages/ChildrenList";
import PaymentsReport from "./pages/PaymentsReport";

const AppLayout = () => {
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
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
