import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { authContext } from "../context/AuthContext";
function ConfirmedOrders() {
  const { user } = useContext(authContext);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [error, setError] = useState("");
  const fetchConfirmedOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/confirmed-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfirmedOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.err || "Failed to fetch confirmed orders.");
    }
  };
  useEffect(() => {
    fetchConfirmedOrders();
  }, []);
  return (
    <MainLayout>
      <h2 style={{ marginBottom: "1.5rem", color: "#944C6E" }}>
        {user?.isAdmin ? "All Confirmed Orders" : "Order History"}
      </h2>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {confirmedOrders.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>No confirmed orders yet.</p>
      ) : (
        confirmedOrders.map((order) => (
          <div
            key={order._id}
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#FFF7F2",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Placed On:</strong> {new Date(order.confirmedAt).toLocaleString()}</p>
            <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
              {order.products.map((item, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  {/* <p><strong>Product:</strong> {item.product.name}</p> */}
                  {/* <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Subtotal:</strong> BHD {item.product.price * item.quantity}</p> */}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> BHD {order.totalPrice}</p>
          </div>
        ))
      )}
    </MainLayout>
  );
}
export default ConfirmedOrders;