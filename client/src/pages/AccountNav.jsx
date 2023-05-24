import { HomeIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

export default function AccountNav() {
  const location = useLocation();

  const linkClasses = (type = null) => {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    if (type === false) {
      classes += ' bg-primary text-white rounded-full';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  };
  return (
    <nav className="w-full flex justify-center mt-8 gap-4 mb-8 font-semibold">
      <Link className={linkClasses('profile')} to="/account">
        <UserIcon className="w-6 h-6" />
        My Profile
      </Link>
      <Link className={linkClasses('bookings')} to="/account/bookings">
        <ListBulletIcon className="w-6 h-6" />
        My Bookings
      </Link>
      <Link className={linkClasses('places')} to="/account/places">
        <HomeIcon className="w-6- h-6" />
        My Accomodation
      </Link>
    </nav>
  );
}
