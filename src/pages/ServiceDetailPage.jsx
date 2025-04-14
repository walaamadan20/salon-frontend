import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
        // Call the backend to create a new booking
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
          userId: user._id,
          serviceId,
          staff: selectedStaff,
          date: selectedDate,
          time: selectedTime
        });
        

        // Optionally, you can also update the service schedule locally if you want to reflect the change immediately
        alert(`✅ Booking confirmed! With ${selectedStaff} on ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}`);

        // Redirect to the bookings page after successful booking
        // navigate('/bookings');
      } catch (err) {
        console.error('Booking error:', err);
        alert('❌ Failed to book. Please try another time slot.');
      }
    }
  };

  if (!service) return <p>Loading...</p>;

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
    <div style={{ padding: '20px' }}>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: BHD {service.price}</p>

      <h2>Book an Appointment</h2>

      {/* Staff Dropdown */}
      <div>
        <label><strong>Select Staff:</strong></label>
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          style={{ width: '200px', marginTop: '10px' }}
        >
          <option value="">Select Staff</option>
          {service.staff.map((member, index) => (
            <option key={index} value={member}>{member}</option>
          ))}
        </select>
      </div>

      {/* Date Dropdown */}
      <div style={{ marginTop: '20px' }}>
        <label><strong>Select Date:</strong></label>
        <select
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime('');
          }}
          style={{ width: '200px', marginTop: '10px' }}
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
        <div style={{ marginTop: '20px' }}>
          <label><strong>Select Time:</strong></label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{ width: '200px', marginTop: '10px' }}
          >
            <option value="">Select Time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      )}

      {/* Book Now Button */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={handleSchedule}
          disabled={!selectedStaff || !selectedDate || !selectedTime}
          style={{
            padding: '10px 20px',
            fontWeight: 'bold',
            backgroundColor: (!selectedStaff || !selectedDate || !selectedTime) ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            cursor: (!selectedStaff || !selectedDate || !selectedTime) ? 'not-allowed' : 'pointer',
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default ServiceDetailPage;
