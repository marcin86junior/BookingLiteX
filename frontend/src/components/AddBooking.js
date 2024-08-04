import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBooking.css';  // Import the CSS file

function AddBooking() {
  const [flats, setFlats] = useState([]);
  const [flat, setFlat] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [message, setMessage] = useState(''); // Add state for message
  const [isError, setIsError] = useState(false); // Add state for error

  useEffect(() => {
    // Fetch the list of flats from the API to populate the dropdown
    axios.get('http://localhost:8000/api/flats/')
      .then(response => {
        setFlats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the flats!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBooking = {
      flat,
      checkin,
      checkout,
    };

    axios.post('http://localhost:8000/api/bookings/', newBooking)
      .then(response => {
        console.log(response.data);
        setMessage('Booking added successfully!');
        setIsError(false); // Set isError to false for success message
        // Clear the form
        setFlat('');
        setCheckin('');
        setCheckout('');
      })
      .catch(error => {
        console.error('There was an error adding the booking!', error);

        // Check for specific error message from backend
        if (error.response && error.response.data && error.response.data.includes('The flat is already booked for the specified dates.')) {
          setMessage('The flat is already booked for the specified dates.');
        } else {
          setMessage('There was an error adding the booking.');
        }
        setIsError(true); // Set isError to true for error message
      });
  };

  return (
    <div className="add-booking">
      <h1>Add Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="flat">Flat:</label>
          <select
            id="flat"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            required
          >
            <option value="" disabled>Select a flat</option>
            {flats.map(flat => (
              <option key={flat.id} value={flat.id}>{flat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="checkin">Checkin:</label>
          <input
            type="date"
            id="checkin"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkout">Checkout:</label>
          <input
            type="date"
            id="checkout"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Booking</button>
      </form>
      {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>} {/* Display the message */}
    </div>
  );
}

export default AddBooking;