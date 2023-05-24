import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotosUpload from '../PhotosUpload';
import Perks from '../Perks';

export default function PlacesFormPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title.trim() === '' ||
      address.trim() === '' ||
      description.trim() === ''
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    await axios.post('/places', {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    navigate('/account/places');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mt-4">Title</h2>
        <input
          type="text"
          placeholder="Title e.g. My modern apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <PhotosUpload
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <h2 className="text-2xl mt-4">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Perks selected={perks} onChange={setPerks} />
        <h2 className="text-2xl mt-4">Additonal information</h2>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-2xl my-4">Check In & Out Times and Guests</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              placeholder="11:00"
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="">Maximum number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
