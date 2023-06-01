/* eslint-disable react/prop-types */
import {
  CalendarIcon,
  CreditCardIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { differenceInCalendarDays, format } from 'date-fns';

export default function BookingInfo({ booking }) {
  return (
    <div className="py-3 pr-3 grow">
      <h2 className="text-xl">{booking.place.title}</h2>
      <div className="text-sm flex gap-2 border-t border-gray-300 mt-2 py-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
        </div>
        &rarr;
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
        </div>
      </div>
      <div className="text-sm">
        <div className="flex gap-2 items-center">
          <MoonIcon className="w-5 h-5" />
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}
          {' nights'}
        </div>
        <div className="flex gap-2 items-center">
          <CreditCardIcon className="w-5 h-5" />
          Total price: ${booking.price}
        </div>
      </div>
    </div>
  );
}
