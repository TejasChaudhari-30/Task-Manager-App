import { Link } from "react-router-dom";
import "../Home_page.css" // same CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">TaskManager</div>

      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>

        <li>
          <Link to="/login" className="btn login-btn">Login</Link>
        </li>
        <li>
          <Link to="/register" className="btn register-btn">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;