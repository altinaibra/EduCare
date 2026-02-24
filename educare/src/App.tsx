import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import KindergartenDetails from "./pages/Details";
import RegisterChild from "./pages/RegisterChild";
import ChildrenList from "./pages/ChildrenList";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f5f5f5" }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/details" style={{ marginRight: 10 }}>Detajet</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Regjistro</Link>
        <Link to="/children">Lista</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<KindergartenDetails />} />
        <Route path="/register" element={<RegisterChild />} />
        <Route path="/children" element={<ChildrenList />} />
      </Routes>
    </Router>
  );
}

export default App;