import { Link, useParams } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import PlacesFormPage from './PlacesFormPage';

export default function PlacesPage() {
  const { action } = useParams();

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 items-center bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
            <PlusIcon className="w-6 h-6" />
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && <PlacesFormPage />}
    </div>
  );
}
