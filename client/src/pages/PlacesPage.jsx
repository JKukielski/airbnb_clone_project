import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import AccountNav from './AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  console.log(places);
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <br />
        <Link
          className="inline-flex gap-1 items-center bg-primary text-white py-2 px-6 rounded-full"
          to="/account/places/new"
        >
          <PlusIcon className="w-6 h-6" />
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places?.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place?._id}
              className="flex bg-gray-100 p-2 rounded-2xl gap-4 cursor-pointer
            "
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                {place?.photos?.length > 0 && (
                  <img
                    className="object-cover"
                    src={'http://localhost:4000/uploads/' + place?.photos[0]}
                  />
                )}
              </div>
              <div className="">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 ">{place?.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
