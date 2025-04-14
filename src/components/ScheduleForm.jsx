import { useState } from 'react';
import '../css/ScheduleForm.css';

const ScheduleForm = ({ schedule, staff, onSchedule }) => {
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableDates = [...new Set(
    schedule
      .filter(slot => !slot.isBooked)
      .map(slot => slot.date)
  )];

  const availableTimes = selectedDate
    ? schedule
        .filter(slot =>
          slot.date === selectedDate &&
          !slot.isBooked
        )
        .map(slot => slot.time)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStaff && selectedDate && selectedTime) {
      onSchedule({
        staff: selectedStaff,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      {/* Staff Selection */}
      <div>
        <label><strong>Select Staff:</strong></label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {staff.map((member, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedStaff(member)}
              className={selectedStaff === member ? 'selected-button' : 'option-button'}
            >
              {member}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div style={{ marginTop: '20px' }}>
        <label><strong>Select Date:</strong></label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {availableDates.map((date, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime('');
              }}
              className={selectedDate === date ? 'selected-button' : 'option-button'}
            >
              {new Date(date).toLocaleDateString()}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <label><strong>Select Time:</strong></label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {availableTimes.map((time, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? 'selected-button' : 'option-button'}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div style={{ marginTop: '30px' }}>
        <button
          type="submit"
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
    </form>
  );
};

export default ScheduleForm;
