import axios, { AxiosError } from 'axios';
import { useAxiosError } from '@/composables/useAxiosError';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    const { status, message } = useAxiosError(error);

    console.warn('API: ', status, message);

    return Promise.reject({ status, message });
  }
);
