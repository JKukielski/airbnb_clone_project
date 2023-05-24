/* eslint-disable react/prop-types */
import { RadioIcon, TruckIcon, TvIcon } from '@heroicons/react/24/outline';
import { BugAntIcon, EyeSlashIcon, WifiIcon } from '@heroicons/react/24/solid';

export default function Perks({ selected, onChange }) {
  const handleCheckboxClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <>
      <h2 className="text-2xl mt-4">Perks</h2>
      <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="wifi" onChange={handleCheckboxClick} />
          <WifiIcon className="w-6 h-6" />
          <span>Wi-Fi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="parking"
            onChange={handleCheckboxClick}
          />
          <TruckIcon className="w-6 h-6" />
          <span>Free Parking</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="tv" onChange={handleCheckboxClick} />
          <TvIcon className="w-6 h-6" />
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="pets" onChange={handleCheckboxClick} />
          <BugAntIcon className="w-6 h-6" />
          <span>Pets allowed</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="entrance"
            onChange={handleCheckboxClick}
          />
          <EyeSlashIcon className="w-6 h-6" />
          <span>Private entrance</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" name="radio" onChange={handleCheckboxClick} />
          <RadioIcon className="w-6 h-6" />
          <span>Radio</span>
        </label>
      </div>
    </>
  );
}
