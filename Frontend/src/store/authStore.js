/**
 * authStore.js — Authentication State (Flask/JWT Backend)
 *
 * Auth is handled entirely by the Flask backend:
 *   POST /api/auth/register
 *   POST /api/auth/login
 *   POST /api/auth/refresh
 *   POST /api/auth/logout
 *   GET  /api/auth/profile
 *
 * Tokens are stored in localStorage and auto-attached by apiClient.
 * LoginPage/RegisterPage expect: login, register, loginWithGoogle,
 * initializeAuth, isLoading, error, isFirebaseActive.
 */
import { create } from 'zustand';
import { authApi } from '../services/authApi';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('access_token') || null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Always false — Firebase is not used; this flag controls the
  // "Developer Mock Mode" warning banner in LoginPage/RegisterPage.
  isFirebaseActive: false,

  // ── Called once on app mount (App.jsx calls initializeAuth) ──
  initializeAuth: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const result = await authApi.getProfile();
      const p = result.data;
      set({
        user: {
          ...p,
          name: p.full_name || p.username || 'User',
          avatar: p.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name || p.username || 'User')}&background=7c3aed&color=fff&size=80`,
        },
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      // Token invalid or expired — clear it
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  // ── Login with email + password ──
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await authApi.login(email, password);
      const { access_token, refresh_token, user_id, username } = result.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      set({
        user: { user_id, username, email, name: username },
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Fetch full profile in background to get full_name, preferences, etc.
      try {
        const profile = await authApi.getProfile();
        const p = profile.data;
        set({
          user: {
            ...p,
            name: p.full_name || p.username || username,
            avatar: p.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.full_name || p.username || username)}&background=7c3aed&color=fff&size=80`,
          },
        });
      } catch {
        // Non-critical — basic info is already set
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  // ── Register a new user ──
  register: async (fullName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await authApi.register(fullName, email, password);
      const { access_token, refresh_token, user_id, username } = result.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      set({
        user: {
          user_id,
          username,
          email,
          name: fullName || username,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=7c3aed&color=fff&size=80`,
        },
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  // ── Google Sign-In stub (not available without Firebase) ──
  // LoginPage calls this — we surface a friendly error instead of crashing.
  loginWithGoogle: async () => {
    set({ error: 'Google sign-in requires Firebase configuration. Please use email and password.' });
    throw new Error('Google sign-in not configured');
  },

  // ── Logout ──
  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore — we log out regardless
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ user: null, token: null, isAuthenticated: false, error: null });
    }
  },

  // ── Update profile data locally after a profile edit ──
  updateProfile: (profileData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...profileData } : null,
    }));
  },

  clearError: () => set({ error: null }),
}));
