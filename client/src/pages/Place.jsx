import { MapPinIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';

export default function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [displayImg, setDisplayImg] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/places/${id}`).then((response) => {
        setPlace(response.data);
      });
    }
  }, [id]);

  if (displayImg) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place?.title}</h2>
            <button
              onClick={() => setDisplayImg(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <XMarkIcon className="w-6 h-6" />
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img src={`http://localhost:4000/uploads/${photo}`} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
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
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place?.photos?.[0] && (
              <div>
                <img
                  onClick={() => setDisplayImg(true)}
                  className="aspect-sqaure object-cover cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place?.photos?.[1] && (
              <img
                onClick={() => setDisplayImg(true)}
                className="aspect-sqaure object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos?.[1]}`}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place?.photos?.[2] && (
                <img
                  onClick={() => setDisplayImg(true)}
                  className="aspect-sqaure object-cover relative top-2 cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos?.[2]}`}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDisplayImg(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadwo-md shadow-gray-500"
        >
          <ViewColumnsIcon className="w-6 h-6" />
          Show all photos...
        </button>
      </div>

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
