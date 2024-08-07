import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookingsTable = () => {
    const [bookings, setBookings] = useState([]);
    const [flats, setFlats] = useState([]);

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

    // Create a map of flat IDs to flat names
    const flatIdToName = {};
    flats.forEach(flat => {
        flatIdToName[flat.id] = flat.name;
    });

    return (
        <div>
            <h1>Booking List</h1>
            <Link to="/add-booking" className="add-booking-button">Add Booking</Link>
            <table>
                <thead>
                    <tr>
                        <th>Flat Name</th>
                        <th>ID</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                        <th>Previous Booking ID</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{flatIdToName[booking.flat]}</td>
                            <td>{booking.id}</td>
                            <td>{booking.checkin}</td>
                            <td>{booking.checkout}</td>
                            <td>{booking.previous_booking_id ? booking.previous_booking_id : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;