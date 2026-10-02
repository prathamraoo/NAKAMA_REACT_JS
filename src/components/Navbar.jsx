import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Navbar.css";

function Navbar() {
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >
        NAKAMAS
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/booking">
          Table Booking
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/feedback">
          Feedback
        </Link>

      </div>


      <Link
        to="/cart"
        className="cart-button"
      >
        🛒 Cart ({getCartCount()})
      </Link>

    </nav>
  );
}

export default Navbar;