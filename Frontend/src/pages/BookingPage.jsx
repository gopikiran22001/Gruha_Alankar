import React, { useEffect } from 'react';
import { useBookingStore } from '../store/bookingStore';
import BookingCard from '../components/shared/BookingCard';
import { Clock, ShieldAlert } from 'lucide-react';

export const BookingPage = () => {
  const { bookings, cancelBooking, fetchBookings } = useBookingStore();

  // Load bookings from backend on mount
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this furniture booking?')) {
      cancelBooking(id);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span>My Bookings & Orders</span>
        </h2>
        <p className="text-xs text-muted">Track current shipping progress, confirm manufacturing status, and review order histories</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={handleCancelBooking}
          />
        ))}

        {bookings.length === 0 && (
          <div className="glass-panel p-8 rounded-xl text-center text-muted text-xs flex flex-col items-center justify-center space-y-3">
            <ShieldAlert size={24} className="text-muted" />
            <span>No current active bookings found. Go to the Catalog to secure items.</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingPage;
