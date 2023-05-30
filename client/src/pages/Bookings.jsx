import { useEffect, useState } from 'react';
import AccountNav from './AccountNav';
import axios from 'axios';
import PlaceImage from '../PlaceImage';
import { differenceInCalendarDays, format } from 'date-fns';
import {
  CalendarIcon,
  CreditCardIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
    console.log(bookings[0].checkIn);
  }, []);
  return (
    <div>
      <AccountNav />

      <div>
        {bookings?.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              className="my-2 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImage place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-sm flex gap-2 border-t border-gray-300 mt-2 py-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                  </div>
                  &rarr;
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <MoonIcon className="w-5 h-5" />
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}
                    {' nights'}
                  </div>
                  <div className="flex gap-2 items-center">
                    <CreditCardIcon className="w-5 h-5" />
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No bookings found...</h1>
        )}
      </div>
    </div>
  );
}
