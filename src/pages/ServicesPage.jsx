import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>All Services</h2>

      {services.map((service) => (
        <div key={service._id} style={{ marginBottom: "1.5rem", padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link to={`/services/${service._id}`}>
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                style={{ width: "100%", maxWidth: "300px" }}
              />
            )}
            <h3>{service.name}</h3>
            <p>BHD {service.price} • {service.duration}</p>
            {service.description && <p>{service.description}</p>}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ServicesPage;
