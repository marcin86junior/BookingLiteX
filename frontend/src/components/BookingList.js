import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookingsTable.css'; // Import the CSS file

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [flats, setFlats] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'flat', direction: 'ascending' });

  useEffect(() => {
    // Fetch bookings data
    axios.get('http://localhost:8000/api/bookings/')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error);
      });

    // Fetch flats data
    axios.get('http://localhost:8000/api/flats/')
      .then(response => {
        setFlats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the flats!', error);
      });
  }, []);

  useEffect(() => {
    // Sort bookings based on the initial sort config
    let sortedBookings = [...bookings];
    sortData(sortedBookings, sortConfig);
    setBookings(sortedBookings);
  }, [sortConfig]);

  const sortData = (data, config) => {
    data.sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  // Create a map of flat IDs to flat names
  const flatIdToName = {};
  flats.forEach(flat => {
    flatIdToName[flat.id] = flat.name;
  });

  return (
    <div className="table-container">
      <h1>Booking List</h1>
      <Link to="/add-booking" className="add-booking-button">Add Booking</Link>
      <table>
        <thead>
          <tr>
            <th className="sortable" onClick={() => handleSort('flat')}>
              Flat Name <span className="sort-icon">{getSortIcon('flat')}</span>
            </th>
            <th className="sortable" onClick={() => handleSort('id')}>
              ID <span className="sort-icon">{getSortIcon('id')}</span>
            </th>
            <th className="sortable" onClick={() => handleSort('checkin')}>
              Checkin <span className="sort-icon">{getSortIcon('checkin')}</span>
            </th>
            <th className="sortable" onClick={() => handleSort('checkout')}>
              Checkout <span className="sort-icon">{getSortIcon('checkout')}</span>
            </th>
            <th className="sortable" onClick={() => handleSort('previous_booking_id')}>
              Previous Booking ID <span className="sort-icon">{getSortIcon('previous_booking_id')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{flatIdToName[booking.flat]}</td>
                <td>{booking.id}</td>
                <td>{booking.checkin}</td>
                <td>{booking.checkout}</td>
                <td>{booking.previous_booking_id ? booking.previous_booking_id : '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;