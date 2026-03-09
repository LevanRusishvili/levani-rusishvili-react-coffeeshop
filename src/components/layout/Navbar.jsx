import { Link, Outlet, useNavigate } from "react-router-dom"; // Add useNavigate
import PropTypes from "prop-types";
import "../../styles/components/navbar.css";
import "../../styles/index.css";

const Navbar = () => {
  const navigate = useNavigate(); 

  return (
    <div className="app-container">
      <aside className="navbar">
        <div className="navbar-header">
          <h1>Coffee Admin</h1>
          <p>Management Panel</p>
        </div>

        {/* ADD THIS BUTTON - Back to Client Page */}
        <button className="back-to-client-btn" onClick={() => navigate("/")}>
          ← Back to Coffee Shop
        </button>

        <nav className="navbar-menu">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/admin/add-coffee" className="nav-link">
            Add Coffee
          </Link>
          <Link to="/admin/ingredients" className="nav-link">
            Manage Ingredients
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
