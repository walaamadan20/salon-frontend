import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout'; // تأكدي من المسار
function UpdateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: 1.00,
    description: "",
    stock: 0
  });
  const navigate = useNavigate();
  const { productId } = useParams();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/products/${productId}`);
    } catch (err) {
      console.error(":x: Error updating product:", err);
    }
  }
  async function getProduct() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData(res.data);
    } catch (err) {
      console.error(":x: Error fetching product:", err);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <MainLayout>
      <div style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#FFF0F5",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", color: "#C85A9E" }}>Edit Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min={0}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "0.75rem",
              backgroundColor: "#C85A9E",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
export default UpdateProduct;



