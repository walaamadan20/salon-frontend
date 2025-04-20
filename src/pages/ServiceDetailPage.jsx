import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { authContext } from '../context/AuthContext';
function ServiceDetailPage() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchService() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services/${serviceId}`);
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
      }
    }
    fetchService();
  }, [serviceId]);
  const handleSchedule = async () => {
    if (selectedStaff && selectedDate && selectedTime) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
          userId: user._id,
          serviceId,
          staff: selectedStaff,
          date: selectedDate,
          time: selectedTime
        });
        alert(` Booking confirmed! With ${selectedStaff} on ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}`);
        // navigate('/bookings'); // Uncomment if you want redirection
      } catch (err) {
        console.error('Booking error:', err);
        alert('Failed to book. Please try another time slot.');
      }
    }
  };
  if (!service) return <MainLayout><p>Loading...</p></MainLayout>;
  const availableDates = [...new Set(
    service.schedule
      .filter(slot => !slot.isBooked)
      .map(slot => slot.date)
  )];
  const availableTimes = selectedDate
    ? service.schedule
        .filter(slot => slot.date === selectedDate && !slot.isBooked)
        .map(slot => slot.time)
    : [];
  return (
    <MainLayout>
      <div style={{
        backgroundColor: '#FFF7F2',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#944C6E', marginBottom: '1rem' }}>{service.name}</h1>
        <p style={{ marginBottom: '0.5rem' }}>{service.description}</p>
        <p style={{ marginBottom: '0.5rem' }}>Duration: <strong>{service.duration}</strong></p>
        <p style={{ marginBottom: '1.5rem' }}>Price: <strong>BHD {service.price}</strong></p>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#944C6E' }}>Book an Appointment</h2>
        {/* Staff Dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label><strong>Select Staff:</strong></label><br />
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select Staff</option>
            {service.staff.map((member, index) => (
              <option key={index} value={member}>{member}</option>
            ))}
          </select>
        </div>
        {/* Date Dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label><strong>Select Date:</strong></label><br />
          <select
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTime('');
            }}
            style={selectStyle}
          >
            <option value="">Select Date</option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        {/* Time Dropdown */}
        {selectedDate && (
          <div style={{ marginBottom: '2rem' }}>
            <label><strong>Select Time:</strong></label><br />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select Time</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}
        {/* Book Now Button */}
        <button
          onClick={handleSchedule}
          disabled={!selectedStaff || !selectedDate || !selectedTime}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: 'bold',
            backgroundColor: (!selectedStaff || !selectedDate || !selectedTime) ? '#ccc' : '#944C6E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: (!selectedStaff || !selectedDate || !selectedTime) ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          Book Appointment
        </button>
      </div>
    </MainLayout>
  );
}
const selectStyle = {
  width: '100%',
  maxWidth: '300px',
  padding: '0.5rem',
  marginTop: '0.5rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};
export default ServiceDetailPage;


















