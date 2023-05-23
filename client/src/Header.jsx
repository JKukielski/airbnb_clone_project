import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between">
      <a href="" className="flex items-center gap-1">
        <PaperAirplaneIcon className="w-8 h-8 -rotate-90" />
        <span className="font-bold text-xl">airbnb</span>
      </a>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </button>
      </div>
      <Link
        to="/login"
        className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4"
      >
        <Bars3Icon className="w-6 h-6" />
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <UserIcon className="w-6 h-6 relative top-1" />
        </div>
      </Link>
    </header>
  );
}
