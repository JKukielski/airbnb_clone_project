import { MapPinIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';

export default function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/places/${id}`).then((response) => {
        setPlace(response.data);
      });
    }
  }, [id]);

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        className="flex gap-1 underline my-3"
        target="_blank"
        rel="noreferrer"
        href={`https://maps.google.com/?q=${place?.address}`}
      >
        <MapPinIcon className="w-5 h-5" />
        {place?.address}
      </a>
      <PlaceGallery place={place} />

      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-2xl">Description</h2>
            {place?.description}
          </div>
          Check-in: {place?.checkIn} <br />
          Check-out: {place?.checkOut} <br />
          Max number of guests: {place?.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 p-8 border-t">
        <div>
          <h2 className="text-2xl">Additional information</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place?.extraInfo}
        </div>
      </div>
    </div>
  );
}
