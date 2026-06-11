/**
 * bookingApi.js — Booking Endpoints
 *
 * POST /booking/create      — Create a new booking
 * GET  /booking/track/:id   — Track a booking
 * GET  /booking/list         — List user bookings
 */
import apiClient from './apiClient';

export const bookingApi = {
  /**
   * Create a new product booking.
   */
  create: async (products, paymentInfo = {}, deliveryAddress = {}, projectId = null) => {
    const response = await apiClient.post('/booking/create', {
      products,
      payment_info: paymentInfo,
      delivery_address: deliveryAddress,
      project_id: projectId,
    });
    return response.data;
  },

  /**
   * Track a booking by ID.
   */
  track: async (bookingId) => {
    const response = await apiClient.get(`/booking/track/${bookingId}`);
    return response.data;
  },

  /**
   * List all bookings for the current user.
   */
  list: async (status = null) => {
    const params = {};
    if (status) params.status = status;
    const response = await apiClient.get('/booking/list', { params });
    return response.data;
  },
};
