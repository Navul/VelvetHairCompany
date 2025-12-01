/**
 * Axios API Client
 * 
 * Centralized axios instance with interceptors for handling
 * authentication, errors, and automatic token refresh.
 */

import axios from 'axios';
import { API_CONFIG, API_BASE_URL } from './api.config';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (process.env.NODE_ENV === 'development') {
        console.error('❌ API Error Response:', {
          status,
          url: error.config?.url,
          message: data?.message || error.message,
          data
        });
      }

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          console.error('🔒 Unauthorized: Clearing authentication');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;

        case 403:
          // Forbidden
          console.error('🚫 Forbidden: Insufficient permissions');
          break;

        case 404:
          // Not found
          console.error('🔍 Not Found: Resource does not exist');
          break;

        case 500:
          // Server error
          console.error('💥 Server Error: Internal server error');
          break;

        default:
          console.error(`⚠️ Error ${status}: ${data?.message || error.message}`);
      }

      // Return custom error object
      return Promise.reject({
        status,
        message: data?.message || error.message,
        data: data || null
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('📡 Network Error: No response from server', {
        baseURL: API_BASE_URL,
        url: error.config?.url
      });
      
      return Promise.reject({
        status: 0,
        message: 'Network error: Unable to connect to server. Please check your internet connection.',
        data: null
      });
    } else {
      // Something else happened
      console.error('❌ Request Setup Error:', error.message);
      
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        data: null
      });
    }
  }
);

// API helper methods
export const api = {
  // GET request
  get: (url, config = {}) => {
    return apiClient.get(url, config);
  },

  // POST request
  post: (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
  },

  // PUT request
  put: (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
  },

  // PATCH request
  patch: (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config);
  },

  // DELETE request
  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  },

  // Upload file with FormData
  upload: (url, formData, onUploadProgress) => {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }
};

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;
