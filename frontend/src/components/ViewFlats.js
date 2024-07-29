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
      <h1>Flat List:</h1>
      <table className="flats-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {flats.map(flat => (
            <tr key={flat.id}>
              <td>{flat.id}</td>
              <td>{flat.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-booking" className="add-booking-button">Add Booking</Link>
    </div>
  );
}

export default ViewFlats;