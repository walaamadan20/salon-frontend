import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import OrderButton from '../components/orderButton';
import { authContext } from '../context/AuthContext';
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
  if (!product) return <MainLayout><p>Loading...</p></MainLayout>;
  return (
    <MainLayout>
      <div style={{
        backgroundColor: '#FFF7F2',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#944C6E', marginBottom: '1rem' }}>{product.name}</h1>
        <p style={{ fontSize: '1.1rem' }}><strong>Price:</strong> BHD {product.price}</p>
        <p style={{ fontSize: '1.1rem' }}><strong>Description:</strong> {product.description}</p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}><strong>Stock Available:</strong> {product.stock}</p>
        {user?.isAdmin ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => navigate(`/products/${productId}/update`)}
              style={editBtnStyle}
            >
               Edit
            </button>
            <button
              onClick={handleDelete}
              style={deleteBtnStyle}
            >
               Delete
            </button>
          </div>
        ) : (
          <OrderButton productId={product._id} stock={product.stock} />
        )}
      </div>
    </MainLayout>
  );
}
// Styles
const editBtnStyle = {
  backgroundColor: '#F0C4D3',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  color: '#944C6E',
  fontWeight: 'bold',
  cursor: 'pointer'
};
const deleteBtnStyle = {
  backgroundColor: '#FADBE0',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  color: '#B22222',
  fontWeight: 'bold',
  cursor: 'pointer'
};
export default ProductDetails;


















