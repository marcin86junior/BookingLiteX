// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import BookingList from './components/BookingList';
import AddFlat from './components/AddFlat';
import AddBooking from './components/AddBooking';
import ViewFlats from './components/ViewFlats';

const App = () => (
  <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/add-flat" element={<AddFlat />} />
        <Route path="/add-booking" element={<AddBooking />} />
        <Route path="/view-flats" element={<ViewFlats />} />
      </Routes>
    </div>
  </Router>
);

export default App;

