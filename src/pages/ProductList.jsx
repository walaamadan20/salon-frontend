import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

function ProductList() {
  const { user } = useContext(authContext);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`);
      // Newest first
      setProducts(res.data.reverse());
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/new`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Reset form + show success message + refresh
      setFormData({ name: "", description: "", price: "", stock: "" });
      setSuccessMessage("✅ Product created successfully!");
      fetchProducts();

      // Hide success message after 2.5s
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>🛍️ All Products</h2>

      {/* Admin-only form */}
      {user?.isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Create New Product</h3>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            <button type="submit">Create Product</button>
          </form>
        </div>
      )}

      {/* Product List */}
      {products.map((product) => (
        <div key={product._id} style={{ marginBottom: "1.5rem", padding: "10px", borderBottom: "1px solid #ccc" }}>
          <h3>{product.name}</h3>
          <p>💰 ${product.price}</p>
          <p>{product.description}</p>
          <p>Stock: {product.stock}</p>
          <Link to={`/products/${product._id}`}>🔍 View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
