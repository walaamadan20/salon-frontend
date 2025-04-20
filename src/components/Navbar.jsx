import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import logo from "../assets/lilies.png";

function Navbar() {
  const { user, logout } = useContext(authContext);

  return (
    <>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src={logo} alt="Lilies logo" className="logo-img" />
        </div>

        {/* Nav Links */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Homepage</Link></li>

          <li className="nav-hover">
            <div className="nav-hover-wrapper">
              <Link to="/products" className="nav-link nav-bold">Products</Link>
              {user?.isAdmin && (
                <div className="dropdown-menu">
                  <Link to="/products/create" className="dropdown-item">➕ Add Product</Link>
                </div>
              )}
            </div>
          </li>

          <li><Link to="/services" className="nav-link">Services</Link></li>

          {user && !user.isAdmin && (
            <li><Link to="/orders" className="nav-link">My Cart</Link></li>
          )}

          {user && (
            <li>
              <Link to="/confirmed-orders" className="nav-link">
                {user.isAdmin ? "All Confirmed Orders" : "My Orders"}
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link to="/bookings" className="nav-link">
                {user.isAdmin ? "All Bookings" : "My Bookings"}
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="welcome-text">Welcome, {user.username}</li>
              <li>
                <button onClick={logout} className="logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/signup" className="nav-link">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Embedded CSS */}
      <style>{`
        .navbar {
          padding: 1rem 2rem;
          background: #FDECEF;
          border-bottom: 1px solid #F5C6D6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-img {
          width: 40px;
          height: 40px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          align-items: center;
          padding: 0;
          margin: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #B45C7A;
          font-weight: 500;
        }

        .nav-bold {
          font-weight: bold;
        }

        .nav-hover {
          position: relative;
        }

        .nav-hover-wrapper {
          position: relative;
          display: inline-block;
        }

        .nav-hover-wrapper:hover .dropdown-menu {
          display: block;
        }

        .dropdown-menu {
          position: absolute;
          top: 120%;
          left: 0;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          padding: 0.5rem 0;
          display: none;
          z-index: 1000;
          min-width: 160px;
        }

        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: #B45C7A;
          font-weight: 500;
        }

        .dropdown-item:hover {
          background-color: #FFF0F5;
        }

        .welcome-text {
          color: #944C6E;
        }

        .logout-btn {
          background-color: #B45C7A;
          color: #fff;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default Navbar;
