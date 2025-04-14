import axios from "axios";
import { useEffect, useState, useContext } from "react";
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
      console.log(res.data)
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.err || "Failed to fetch orders.");
    }
  };

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.err || "Failed to delete order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "700px", margin: "auto" }}>
      <h2>{user?.isAdmin ? " All Orders (Admin View)" : " My Orders"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>{user?.isAdmin ? "No orders placed yet." : "You have no orders yet."}</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>
            <p><strong> Order ID:</strong> {order._id}</p>
            <p><strong> Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong> Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            {user?.isAdmin && <p><strong>👤 User:</strong> {order.user?.username}</p>}

            <ul>
            <h2>Order Details</h2>
              {order.products.map((item, index) => (
                <li key={index}>
                  
                  Product: {item.product.name} <br></br>
                  Quantity: {item.quantity} <br></br>
                  Total Price: BHD{item.product?.price * item.quantity}
                </li>
              ))}
            </ul>

            {!user?.isAdmin && (
              <button onClick={() => handleDelete(order._id)}> Cancel Order</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderList;
