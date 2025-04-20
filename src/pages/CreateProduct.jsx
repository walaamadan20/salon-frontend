import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });
  const navigate = useNavigate();
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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const createdProduct = res.data;
      navigate(`/products/${createdProduct._id}`);
    } catch (err) {
      console.error(":x: Error creating product:", err.response?.data || err.message);

    }
  };
  return (
    <MainLayout>
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#8A2D5D" }}>Create New Product</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            backgroundColor: "#FFF3F7",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
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
          <button
            type="submit"
            style={{
              backgroundColor: "#D36E9B",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Create Product
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
export default CreateProduct;






        <label htmlFor="image">Image</label>
        <input type="file"
         name="image"
          accept="image/*" 
          onChange={handleChange} />

        
        <button>Submit</button>
      </form>
    </div>
  )}



export default CreateProduct0

