import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import KindergartenDetails from "./pages/Details";
import RegisterChild from "./pages/RegisterChild";
import ChildrenList from "./pages/ChildrenList";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="top-nav-wrap">
          <nav className="top-nav">
            <NavLink to="/" className="brand">
              EduCare
            </NavLink>
            <div className="nav-links">
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
            </div>
          </nav>
        </header>

        <main className="page-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<KindergartenDetails />} />
            <Route path="/register" element={<RegisterChild />} />
            <Route path="/children" element={<ChildrenList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
