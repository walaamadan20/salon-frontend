import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Navbar from "../components/Navbar";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        formData
      );
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "400px",
          margin: "3rem auto",
          padding: "2rem",
          borderRadius: "12px",
          backgroundColor: "#fff0f5",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#c85a9e" }}>
          Create Account
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label htmlFor="username">Email:</label>
          <input
            type="email"
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
              padding: "0.75rem",
              backgroundColor: "#c85a9e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#b23a8a", textDecoration: "underline" }}
          >
            Login
          </Link>
        </p>
      </div>
    </MainLayout>
  );
}

export default Signup;
