// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/view-flats">View Flats</Link></li>
        <li><Link to="/add-booking">Add Booking</Link></li>
        <li><Link to="/bookings">View Bookings</Link></li>
        <li><Link to="/add-flat">Add Flat</Link></li>

      </ul>
    </nav>
  );
}

export default NavBar;