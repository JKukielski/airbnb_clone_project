import { MapPinIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGallery from '../PlaceGallery';
import BookingInfo from '../BookingInfo';

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const fetchedBooking = response.data.find(({ _id }) => _id === id);
        if (fetchedBooking) {
          setBooking(fetchedBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place?.title}</h1>
      <a
        className="flex gap-1 underline my-3"
        target="_blank"
        rel="noreferrer"
        href={`https://maps.google.com/?q=${booking.place?.address}`}
      >
        <MapPinIcon className="w-5 h-5" />
        {booking.place?.address}
      </a>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between">
        <div>
          <h2 className="text-xl mb-2">Your booking information:</h2>
          <BookingInfo booking={booking} />
        </div>
        <div className="flex items-center text-2xl bg-primary p-6 text-white rounded-2xl">
          Total price: ${booking.price}
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
