import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(authContext);

  return (
    <div>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}>
        {/* Common routes */}
        <li><Link to="/"> Homepage</Link></li>
        <li><Link to="/products"> All Products</Link></li>
        <li><Link to="/services"> Services</Link></li>
        {user && (
          <li>
            <Link to="/orders">
               {user.isAdmin ? "All Orders" : "My Orders"}
            </Link>
          </li>
        )}

{user && (
          <li>
            <Link to="/bookings">
               {user.isAdmin ? "All Bookings" : "My Bookings"}
            </Link>
          </li>
        )}

        {/* Auth-related */}
        {user ? (
          <>
            <li> Welcome, {user.username}</li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
