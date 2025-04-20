import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { validateToken } = useContext(authContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      await validateToken();
      navigate("/"); // Redirect to home or dashboard after login
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "2rem",
          backgroundColor: "#fff0f5",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#c94e8b" }}>Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "0.7rem",
              backgroundColor: "#c94e8b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            style={{ color: "#c94e8b", fontWeight: "bold" }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </MainLayout>
  );
}

export default Login;
