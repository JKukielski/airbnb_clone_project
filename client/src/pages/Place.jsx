import { ViewColumnsIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <button className="flex gap-1 py-2 px-4 rounded-2xl">
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
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        className="block underline my-2"
        target="_blank"
        rel="noreferrer"
        href={`https://maps.google.com/?q=${place?.address}`}
      >
        {place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place?.photos?.[0] && (
              <div>
                <img
                  className="aspect-sqaure object-cover"
                  src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place?.photos?.[1] && (
              <img
                className="aspect-sqaure object-cover"
                src={`http://localhost:4000/uploads/${place.photos?.[1]}`}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place?.photos?.[2] && (
                <img
                  className="aspect-sqaure object-cover relative top-2"
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
    </div>
  );
}
