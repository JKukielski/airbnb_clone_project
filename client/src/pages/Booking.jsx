import { useParams } from 'react-router-dom';

export default function Booking() {
  const { id } = useParams();

  return <div>Single booking: {id}</div>;
}
