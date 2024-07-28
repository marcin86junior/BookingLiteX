import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewFlats.css'; // Import the CSS file

function ViewFlats() {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/flats/')
      .then(response => {
        setFlats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the flats!', error);
      });
  }, []);

  return (
    <div className="view-flats-section">
      <h1>Flat List: </h1>
      <ul>
        {flats.map(flat => (
          <li key={flat.id}>{flat.name}</li>
        ))}
      </ul>
      <Link to="/add-booking" className="add-booking-button">Add Booking</Link>
    </div>
  );
}

export default ViewFlats;