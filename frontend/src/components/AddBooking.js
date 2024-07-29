// src/components/AddBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBooking.css';  // Import the CSS file

function AddBooking() {
  const [flats, setFlats] = useState([]);
  const [flat, setFlat] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

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
        // You might want to redirect the user or clear the form after successful submission
      })
      .catch(error => {
        console.error('There was an error adding the booking!', error);
      });
  };

  return (
    <div className="add-booking">
      <h1></h1>
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
    </div>
  );
}

export default AddBooking;