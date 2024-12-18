import axios from 'axios';
import { config } from '../config';
import type { Vendor, Review, User } from '../types';

const api = axios.create({
    baseURL: config.api.baseURL,
    timeout: config.api.timeout,
    withCredentials: config.api.withCredentials,
  });
  
  // API Request interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // API Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Handle token refresh or logout
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  export const vendorAPI = {
    async getAll() {
      const { data } = await api.get<Vendor[]>('/vendors');
      return data;
    },
  
    async getByUsername(username: string) {
      const { data } = await api.get<Vendor>(`/vendors/${username}`);
      return data;
    },
  
    async create(vendorData: Partial<Vendor>) {
      const { data } = await api.post<Vendor>('/vendors', vendorData);
      return data;
    },
  
    async update(id: string, vendorData: Partial<Vendor>) {
      const { data } = await api.put<Vendor>(`/vendors/${id}`, vendorData);
      return data;
    },
  
    async delete(id: string) {
      await api.delete(`/vendors/${id}`);
    },
  
    async search(query: string) {
      const { data } = await api.get<Vendor[]>('/vendors/search', {
        params: { query },
      });
      return data;
    },
  };
  
  export const reviewAPI = {
    async getByVendor(vendorId: string, page = 1, limit = 10) {
      const { data } = await api.get<{
        reviews: Review[];
        pagination: { total: number; pages: number; currentPage: number };
      }>(`/reviews/vendor/${vendorId}`, {
        params: { page, limit },
      });
      return data;
    },
  
    async create(reviewData: {
      rating: number;
      comment: string;
      vendorId: string;
    }) {
      const { data } = await api.post<Review>('/reviews', reviewData);
      return data;
    },
  
    async update(id: string, reviewData: Partial<Review>) {
      const { data } = await api.put<Review>(`/reviews/${id}`, reviewData);
      return data;
    },
  
    async delete(id: string) {
      await api.delete(`/reviews/${id}`);
    },
  };
  
  export const authAPI = {
    async login(code: string) {
      const { data } = await api.post<{ token: string; user: User }>('/auth/instagram', { code });
      localStorage.setItem('auth_token', data.token);
      return data;
    },
  
    async logout() {
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
    },
  
    async getProfile() {
      const { data } = await api.get<User>('/auth/profile');
      return data;
    },
};
  
export default api;