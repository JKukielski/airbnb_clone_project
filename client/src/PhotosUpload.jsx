/* eslint-disable react/prop-types */
import { CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';

export default function PhotosUpload({ addedPhotos, setAddedPhotos }) {
  const [link, setLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: link,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setLink('');
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos[]', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
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
            <div key={link} className="h-32 flex relative">
              <img
                className="rounded-2xl w-full object-cover"
                src={`http://localhost:4000/uploads/${link}`}
              />
              <button
                onClick={() => removePhoto(link)}
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 py-2 px-3 rounded-xl"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => selectAsMain(link)}
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 py-2 px-3 rounded-xl"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
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
