import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    navigate('/login');
  }

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  };

  const handleLogout = async () => {
    await axios.post('/logout');
    navigate('/');
    setUser(null);
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8 font-semibold">
        <Link className={linkClasses('profile')} to="/account">
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to="/account/bookings">
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to="/account/places">
          My Accomodation
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
