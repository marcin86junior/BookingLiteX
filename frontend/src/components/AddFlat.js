import React, { useState } from 'react';
import axios from 'axios';
import './AddFlat.css'; // Import the CSS file

function AddFlat() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/flats/', { name })
      .then(response => {
        setMessage('Flat added successfully!');
        setName('');
      })
      .catch(error => {
        setMessage('There was an error adding the flat.');
        console.error('There was an error adding the flat!', error);
      });
  };

  return (
    <div className="add-flat-section">
      <h1>Add Flat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Flat Name"
          required
        />
        <button type="submit">Add Flat</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddFlat;