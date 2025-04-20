import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { authContext } from "../context/AuthContext";
function OrderList() {
  const { user } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.err || "Failed to fetch orders.");
    }
  };
  const handleDelete = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.err || "Failed to delete order.");
    }
  };
  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/confirmed-orders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      fetchOrders(); // Refresh cart
    } catch (err) {
      alert(err.response?.data?.err || "Failed to confirm order.");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <MainLayout>
      <h2 style={{ marginBottom: "1.5rem", color: "#944C6E" }}>
        {user?.isAdmin ? "All Orders (Admin View)" : "My Cart"}
      </h2>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {orders.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>
          {user?.isAdmin ? "No orders placed yet." : "You have no items in the cart yet."}
        </p>
      ) : (
        <>
          {orders.map((order) => (
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
              <ul style={{ paddingLeft: "1rem" }}>
                {order.products.map((item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <p><strong>Product:</strong> {item.product.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Total:</strong> BHD {item.product?.price * item.quantity}</p>
                  </li>
                ))}
              </ul>
              {!user?.isAdmin && (
                <button
                  onClick={() => handleDelete(order._id)}
                  style={deleteBtnStyle}
                >
                   Remove Product
                </button>
              )}
            </div>
          ))}
          {!user?.isAdmin && (
            <button
              onClick={handleConfirmOrder}
              style={confirmBtnStyle}
            >
              Place Order
            </button>
          )}
        </>
      )}
    </MainLayout>
  );
}
const deleteBtnStyle = {
  marginTop: "0.5rem",
  background: "#FADBE0",
  color: "#944C6E",
  border: "none",
  borderRadius: "6px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontWeight: "bold"
};
const confirmBtnStyle = {
  marginTop: "1rem",
  background: "#944C6E",
  color: "#fff",
  border: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};
export default OrderList;









