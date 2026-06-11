/**
 * authApi.js — Real Authentication Endpoints
 *
 * POST /auth/register
 * POST /auth/login
 * POST /auth/refresh
 * POST /auth/logout
 * GET  /auth/profile
 */
import apiClient from './apiClient';

export const authApi = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (fullName, email, password, username) => {
    const response = await apiClient.post('/auth/register', {
      full_name: fullName,
      email,
      password,
      username: username || email.split('@')[0],
    });
    return response.data;
  },

  refresh: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await apiClient.post(
      '/auth/refresh',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    );
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
};
