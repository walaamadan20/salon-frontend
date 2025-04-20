import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { authContext } from "../context/AuthContext";
function ServicesPage() {
  const { user } = useContext(authContext);
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services`);
      setServices(res.data.reverse());
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <MainLayout>
      <h2 style={{ marginBottom: "1.5rem", color: "#944C6E" }}>All Services</h2>
      {services.map((service) => (
        <Link
          to={`/services/${service._id}`}
          key={service._id}
          style={{
            display: "block",
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#FFF7F2",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            textDecoration: "none",
            color: "#333",
          }}
        >
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "0.75rem"
              }}
            />
          )}
          <h3 style={{ marginBottom: "0.5rem", color: "#944C6E" }}>{service.name}</h3>
          <p style={{ marginBottom: "0.25rem" }}>
            <strong>BHD {service.price}</strong> • {service.duration}
          </p>
          {service.description && <p style={{ fontSize: "0.95rem", color: "#555" }}>{service.description}</p>}
        </Link>
      ))}
    </MainLayout>
  );
}
export default ServicesPage;


















