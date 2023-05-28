import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from './AccountNav';

export default function Account() {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }
  // if (!ready) {
  //   return 'Loading...';
  // }

  if (!user) {
    navigate('/login');
  }

  const handleLogout = async () => {
    await axios.post('/logout');
    navigate('/');
    setUser(null);
  };

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
