import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/lilies.png"; // ✅ Make sure your logo file is in src/assets

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

function MainLayout({ children }) {
  return (
    <div style={{
      backgroundColor: "#FFF7F2",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#333"
    }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#FBE8E7",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        {/* ✅ Logo Image */}
        <img
          src={logo}
          alt="Lilies Logo"
          style={{ height: "60px", objectFit: "contain" }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/products" style={navLink}>Products</Link>
          <Link to="/services" style={navLink}>Services</Link>
          <Link to="/bookings" style={navLink}>Bookings</Link>
        </div>
      </nav>

      {/* Page content */}
      <main style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.05)"
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        color: "#999"
      }}>
        &copy; 2025 Lilies Salon. All rights reserved.
      </footer>
    </div>
  );
}

const navLink = {
  textDecoration: "none",
  color: "#944C6E",
  fontWeight: "500"
};

export default MainLayout;
