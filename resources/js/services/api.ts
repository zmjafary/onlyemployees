
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Define the base API URL - this should be updated to your Laravel API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to attach auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Type for API response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: boolean;
}

// Generic GET function with types
export const fetchData = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<ApiResponse<T>>(endpoint, config);
  return response.data.data;
};

// Generic POST function with types
export const postData = async <T, D>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post<ApiResponse<T>>(endpoint, data, config);
  return response.data.data;
};

// Generic PUT function with types
export const updateData = async <T, D>(endpoint: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put<ApiResponse<T>>(endpoint, data, config);
  return response.data.data;
};

// Generic DELETE function with types
export const deleteData = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<ApiResponse<T>>(endpoint, config);
  return response.data.data;
};

export default apiClient;
