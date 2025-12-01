/**
 * API Configuration
 * 
 * This file manages the API base URL for different environments.
 * Automatically switches between development (localhost) and production.
 */

// Determine the environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// API Base URLs
const API_BASE_URLS = {
  development: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  production: process.env.REACT_APP_API_URL || 'https://your-production-domain.com'
};

// Select the appropriate base URL
export const API_BASE_URL = isDevelopment 
  ? API_BASE_URLS.development 
  : API_BASE_URLS.production;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email'
  },

  // User endpoints
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password',
    GET_USER: (id) => `/api/users/${id}`,
    UPDATE_USER: (id) => `/api/users/${id}`,
    DELETE_USER: (id) => `/api/users/${id}`
  },

  // Product endpoints
  PRODUCTS: {
    BASE: '/api/products',
    GET_PRODUCT: (id) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    FEATURED: '/api/products/featured',
    BY_CATEGORY: (category) => `/api/products?category=${category}`
  },

  // Order endpoints
  ORDERS: {
    BASE: '/api/orders',
    CREATE: '/api/orders',
    GET_ORDER: (id) => `/api/orders/${id}`,
    MY_ORDERS: '/api/orders/my-orders',
    UPDATE_STATUS: (id) => `/api/orders/${id}/status`,
    CANCEL: (id) => `/api/orders/${id}/cancel`
  },

  // Cart endpoints (if backend has cart endpoints)
  CART: {
    BASE: '/api/cart',
    ADD_ITEM: '/api/cart/add',
    UPDATE_ITEM: '/api/cart/update',
    REMOVE_ITEM: (itemId) => `/api/cart/${itemId}`,
    CLEAR: '/api/cart/clear'
  },

  // Wishlist endpoints (if backend has wishlist endpoints)
  WISHLIST: {
    BASE: '/api/wishlist',
    ADD: '/api/wishlist/add',
    REMOVE: (productId) => `/api/wishlist/${productId}`
  },

  // Review endpoints (if backend has review endpoints)
  REVIEWS: {
    BASE: '/api/reviews',
    PRODUCT_REVIEWS: (productId) => `/api/reviews/product/${productId}`,
    CREATE: '/api/reviews',
    UPDATE: (id) => `/api/reviews/${id}`,
    DELETE: (id) => `/api/reviews/${id}`
  },

  // Upload endpoints
  UPLOAD: {
    IMAGE: '/api/upload/image',
    MULTIPLE: '/api/upload/multiple'
  },

  // Health check
  HEALTH: '/api/health'
};

// API Configuration
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to check if we're in development mode
export const isDev = () => isDevelopment;

// Helper function to check if we're in production mode
export const isProd = () => isProduction;

// Log current configuration (only in development)
if (isDevelopment) {
  console.log('🔧 API Configuration:');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API Base URL:', API_BASE_URL);
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_CONFIG,
  getApiUrl,
  isDev,
  isProd
};
