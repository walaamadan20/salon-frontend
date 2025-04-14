import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

import OrderButton from '../components/orderButton';



function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    }

    fetchProduct();
  }, [productId]);

  async function handleDelete() {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/products');
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
    }
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>

      <p><strong>Price:</strong> BHD {product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Stock Available:</strong> {product.stock}</p>

      {user?.isAdmin ? (

        <>
          <button onClick={() => navigate(`/products/edit/${productId}`)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
            Delete
          </button>
        </>

      ) : (
        <OrderButton productId={product._id} stock={product.stock} />

      )}
    </div>
  );
}

export default ProductDetails;
