/* eslint-disable react/prop-types */
import { ViewColumnsIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function PlaceGallery({ place }) {
  const [displayImg, setDisplayImg] = useState(false);

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
  );
}
