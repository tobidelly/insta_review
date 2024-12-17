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
  
  