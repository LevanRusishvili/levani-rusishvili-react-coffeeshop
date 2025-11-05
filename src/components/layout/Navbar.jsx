import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/components/navbar.css";
import "../../styles/index.css";  // Global styles

const Navbar = () => {
  return (
    <div className="app-container">
      <aside className="navbar">
        <div className="navbar-header">
          <h1>Coffee Admin</h1>
          <p>Management Panel</p>
        </div>
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
