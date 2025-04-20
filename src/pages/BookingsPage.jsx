import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { authContext } from '../context/AuthContext';
function BookingsPage() {
  const { user } = useContext(authContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data)
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    }
    if (user?._id) {
      fetchBookings();
    }
  }, [user]);
  return (
    <MainLayout>
      <h1 style={{ marginBottom: '1.5rem', color: '#944C6E' }}>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p style={{ fontStyle: 'italic' }}>No bookings yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((booking, index) => (
            <li
              key={index}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
                backgroundColor: '#FFF7F2',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <p><strong>Service:</strong> {booking.serviceId?.name}</p>
              <p><strong>Staff:</strong> {booking.staff}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </li>
          ))}
        </ul>
      )}
    </MainLayout>
  );
}
export default BookingsPage;