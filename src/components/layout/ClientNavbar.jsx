import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../../context/client/CartContext";
import { useContext } from "react";
import "../../styles/components/pages/Cart.css"
const ClientNavbar = () => {
  const { total } = useContext(CartContext); // Make sure you're using the total from context

  return (
    <div className="app-container">
      <aside className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-header">Bean Brew</h1>
        </div>
        <nav className="navbar-menu">
          <Link to="/" className="nav-link">
            Coffee Menu
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
            {total > 0 && <span className="InCart">{total}</span>}
          </Link>
          <Link to="/admin" className="nav-link">
            Admin Panel
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

ClientNavbar.propTypes = {
  children: PropTypes.node,
};

export default ClientNavbar;
