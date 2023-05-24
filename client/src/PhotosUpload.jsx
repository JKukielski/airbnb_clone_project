/* eslint-disable react/prop-types */
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';

export default function PhotosUpload({ addedPhotos, setAddedPhotos }) {
  const [link, setLink] = useState('');

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: fileName } = await axios.post('/upload-by-link', {
      link: link,
    });
    setAddedPhotos((prev) => [...prev, fileName]);
    setLink('');
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    await axios
      .post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  return (
    <>
      <h2 className="text-2xl mt-4">Photos</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-2 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex">
              <img
                className="rounded-2xl w-full object-cover"
                src={`http://localhost:4000/uploads/${link}`}
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex justify-center gap-2 border bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <CloudArrowUpIcon className="w-8 h-8" />
          Upload
        </label>
      </div>
    </>
  );
}
