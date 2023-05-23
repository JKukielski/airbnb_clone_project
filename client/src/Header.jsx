import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between">
      <Link to="/" href="" className="flex items-center gap-1">
        <PaperAirplaneIcon className="w-8 h-8 -rotate-90" />
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 font-semibold">
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
        to={user ? '/account' : '/login'}
        className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4"
      >
        <Bars3Icon className="w-6 h-6" />
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <UserIcon className="w-6 h-6 relative top-1" />
        </div>
        {!!user && <div className="font-semibold">{user.name}</div>}
      </Link>
    </header>
  );
}
