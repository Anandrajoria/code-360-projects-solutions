import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Global/Auth/AuthContext";
import { CartContext } from "../Global/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cart, clearCart } = useContext(CartContext);

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-4">
      <Link className="navbar-brand fw-bold" to="/">
        eCommerce
      </Link>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addproducts">
              Add Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Link
          className="btn btn-outline-primary position-relative cart-icon"
          to="/cartproducts"
        >
          Cart
          <span className="badge bg-danger ms-2 no-of-products">
            {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          </span>
        </Link>
        <button
          className="btn btn-outline-secondary logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
