import React from 'react';
import { Calendar, Tag, ShieldCheck, Truck, Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const BookingCard = ({ booking, onCancel }) => {
  const statusIcons = {
    Pending: Clock,
    Confirmed: ShieldCheck,
    Processing: Package,
    Delivered: Truck
  };

  const getStatusColor = (status, currentStatus) => {
    const sequence = ['Pending', 'Confirmed', 'Processing', 'Delivered'];
    const targetIndex = sequence.indexOf(status);
    const currentIndex = sequence.indexOf(currentStatus);
    
    if (targetIndex < currentIndex) return 'bg-success text-white border-success'; // Past
    if (targetIndex === currentIndex) return 'bg-primary text-white border-primary shadow-glow'; // Present
    return 'bg-surface text-muted border-border'; // Future
  };

  return (
    <div className="glass-card p-5 flex flex-col md:flex-row gap-5 items-start justify-between">
      {/* Product Image and Meta */}
      <div className="flex gap-4 items-center flex-shrink-0">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-background">
          <img src={booking.productImage} alt={booking.productName} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-primary/10 border border-border text-primary px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {booking.status}
            </span>
            <span className="text-[10px] text-muted font-medium">#{booking.id}</span>
          </div>
          <h4 className="text-sm font-bold text-white mt-1">{booking.productName}</h4>
          
          <div className="flex gap-4 mt-2">
            <span className="text-xs text-muted flex items-center gap-1.5">
              <Calendar size={12} className="text-muted" />
              {booking.date}
            </span>
            <span className="text-xs text-white font-bold flex items-center gap-1.5">
              <Tag size={12} className="text-primary" />
              ${booking.price}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="flex-1 w-full max-w-lg mt-3 md:mt-0">
        <div className="relative flex justify-between">
          {/* Connector Line */}
          <div className="absolute top-[15px] left-5 right-5 h-[2px] bg-zinc-800 -z-10" />
          
          {booking.history.map((step, idx) => {
            const IconComponent = statusIcons[step.status] || Clock;
            const colorClass = getStatusColor(step.status, booking.status);
            const isCompleted = step.completed;

            return (
              <div key={idx} className="flex flex-col items-center flex-1 text-center relative">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${colorClass}`}
                >
                  <IconComponent size={14} />
                </motion.div>
                
                <span className="text-[10px] font-bold text-white mt-2 tracking-tight">
                  {step.status}
                </span>
                
                <span className="text-[8px] text-muted mt-0.5 block truncate max-w-[80px]">
                  {isCompleted ? step.date : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Cancellation */}
      {booking.status === 'Pending' && (
        <button
          onClick={() => onCancel(booking.id)}
          className="text-[10px] font-bold text-red-500 hover:text-red-400 hover:bg-red-500/5 px-2.5 py-1.5 border border-red-500/10 hover:border-red-500/20 rounded-lg self-end md:self-center transition-all duration-300"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingCard;
