import axios from "axios";
import { useState } from "react";

function OrderButton({ productId, stock }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setMessage(" You must be logged in to order.");
    }

    if (quantity < 1 || quantity > stock) {
      return setMessage(` Please enter a quantity between 1 and ${stock}`);
    }

    if (stock == 0 ) {
      return setMessage(` Item is Out of Stock`);
    }

    if (stock < quantity ) {
      return setMessage(` Sorry, the quantity requested not Available`);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          products: [{ product: productId, quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(" Order placed successfully!");
      setQuantity(1);
    } catch (err) {
      setMessage(` ${err.response?.data?.error || "Order failed"}`);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        max={stock}
        placeholder="Quantity"
        style={{ width: "80px", marginRight: "10px" }}
      />
      <button onClick={handleOrder}>🛒 Order</button>
      {message && <p style={{ marginTop: "5px", color: "green" }}>{message}</p>}
    </div>
  );
}

export default OrderButton;
