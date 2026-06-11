import { create } from 'zustand';
import { bookingApi } from '../services/bookingApi';

export const useBookingStore = create((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,

  /**
   * Fetch bookings from the backend.
   */
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await bookingApi.list();
      const serverBookings = (result.data?.bookings || []).map((b) => ({
        id: b.booking_id || b._id,
        productName: b.products?.[0]?.name || 'Order',
        productImage: b.products?.[0]?.image_url || '',
        date: b.created_at || new Date().toISOString().split('T')[0],
        price: b.total_inr ? `₹${b.total_inr.toLocaleString()}` : 'N/A',
        status: b.status || 'draft',
        history: (b.status_history || []).map((h) => ({
          status: h.status,
          date: h.timestamp
            ? new Date(h.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
            : '--',
          completed: true,
        })),
      }));
      set({ bookings: serverBookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to load bookings' });
    }
  },

  /**
   * Create a new booking via the backend.
   */
  addBooking: async (product) => {
    try {
      const result = await bookingApi.create(
        [{ name: product.name, price: product.price, quantity: 1, image_url: product.image }],
        {},
        {},
        null
      );

      const newBooking = {
        id: result.data?.booking_id || `book-${Math.floor(100 + Math.random() * 900)}`,
        productName: product.name,
        productImage: product.image,
        date: new Date().toISOString().split('T')[0],
        price: result.data?.total_inr ? `₹${result.data.total_inr.toLocaleString()}` : product.price,
        status: result.data?.status || 'draft',
        history: [
          {
            status: 'Pending',
            date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
            completed: true,
          },
          { status: 'Confirmed', date: '--', completed: false },
          { status: 'Processing', date: '--', completed: false },
          { status: 'Delivered', date: '--', completed: false },
        ],
      };

      set((state) => ({
        bookings: [newBooking, ...state.bookings],
      }));
    } catch (error) {
      console.error('Failed to create booking:', error);
      // Fallback: add locally anyway for UX
      const fallbackBooking = {
        id: `book-${Math.floor(100 + Math.random() * 900)}`,
        productName: product.name,
        productImage: product.image,
        date: new Date().toISOString().split('T')[0],
        price: product.price,
        status: 'Pending',
        history: [
          { status: 'Pending', date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }), completed: true },
          { status: 'Confirmed', date: '--', completed: false },
          { status: 'Processing', date: '--', completed: false },
          { status: 'Delivered', date: '--', completed: false },
        ],
      };
      set((state) => ({ bookings: [fallbackBooking, ...state.bookings] }));
    }
  },

  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),

  progressBookingStatus: (id, nextStatus) =>
    set((state) => ({
      bookings: state.bookings.map((b) => {
        if (b.id !== id) return b;
        const updatedHistory = b.history.map((step) => {
          if (step.status === nextStatus) {
            return {
              ...step,
              completed: true,
              date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
            };
          }
          return step;
        });
        return { ...b, status: nextStatus, history: updatedHistory };
      }),
    })),
}));
