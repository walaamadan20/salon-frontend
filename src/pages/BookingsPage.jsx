import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authContext } from '../context/AuthContext';

function BookingsPage() {
  const { user } = useContext(authContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings/user/${user._id}`);
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
    <div style={{ padding: '20px' }}>
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((booking, index) => (
            <li key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
              <p><strong>Service:</strong> {booking.service?.name}</p>
              <p><strong>Staff:</strong> {booking.staff}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingsPage;
