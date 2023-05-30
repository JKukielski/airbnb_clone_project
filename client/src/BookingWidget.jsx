/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  let noOfDays = 0;
  if (checkIn && checkOut) {
    noOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      place: place?._id,
      price: noOfDays * place?.price,
    });
    const bookingId = response.data._id;
    navigate(`/account/bookings/${bookingId}`);
  };

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place?.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        {noOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Your phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={handleBookingSubmit} className="primary mt-4">
        Book this place for $
        {noOfDays > 0 && <span>{noOfDays * place?.price}</span>}
      </button>
    </div>
  );
}
