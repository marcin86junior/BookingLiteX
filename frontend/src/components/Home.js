// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="welcome-section-2">
      <h1>Welcome to BookingLite v 0.1 Alpha</h1>
      <p>A piece of heaven just for you</p>
      <p>Book exclusively houses, villas, and other properties.</p>
      <Link to="/view-flats" className="flat-list-button">Search flats and houses</Link>
    </div>
  );
}

export default Home;