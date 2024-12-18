import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: false,
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error signing up',
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error logging in',
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error verifying email',
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({ error: null, isCheckingAuth: false });
    }
  },
}));
