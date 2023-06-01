import { useEffect, useState } from 'react';
import AccountNav from './AccountNav';
import axios from 'axios';
import PlaceImage from '../PlaceImage';

import { Link } from 'react-router-dom';
import BookingInfo from '../BookingInfo';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />

      <div>
        {bookings?.length > 0 ? (
          bookings.map((booking, index) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={index}
              className="my-2 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImage place={booking.place} />
              </div>
              <BookingInfo booking={booking} />
            </Link>
          ))
        ) : (
          <h1>No bookings found...</h1>
        )}
      </div>
    </div>
  );
}
