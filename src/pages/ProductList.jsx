import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import OrderButton from "../components/orderButton";
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
      setFormData({ name: "", description: "", price: "", stock: "" });
      setSuccessMessage(":white_tick: Product created successfully!");
      fetchProducts();
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err.message);
    }
  };
  return (
    <MainLayout>
      <h2 style={{ marginBottom: "1.5rem", color: "#944C6E" }}>All Products</h2>
     {/*  {user?.isAdmin && (
        <div style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#FFF7F2",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#B45C7A" }}>Create New Product</h3>
          {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button type="submit" style={submitBtnStyle}>Create Product</button>
          </form>
        </div>
      )} */}
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            borderRadius: "10px",
            backgroundColor: "#FFF7F2",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <h3 style={{ color: "#B45C7A" }}>{product.name}</h3>
          <p><strong>BHD:</strong> {product.price}</p>
          <p>{product.description}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <Link to={`/products/${product._id}`} style={linkStyle}>View Details</Link>
          {!user?.isAdmin && (
            <div style={{ marginTop: "0.75rem" }}>
              <OrderButton productId={product._id} stock={product.stock} />
            </div>
          )}
        </div>
      ))}
    </MainLayout>
  );
}
// :nail_varnish: Reusable styles
const inputStyle = {
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};
const submitBtnStyle = {
  backgroundColor: "#944C6E",
  color: "#fff",
  border: "none",
  padding: "0.6rem 1rem",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};
const linkStyle = {
  textDecoration: "none",
  color: "#944C6E",
  fontWeight: "bold"
};
export default ProductList;