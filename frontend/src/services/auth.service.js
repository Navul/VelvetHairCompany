/**
 * Authentication API Service
 * 
 * Handles all authentication-related API calls
 */

import { api } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import { setAuthToken, removeAuthToken } from '../config/apiClient';

class AuthService {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data and token
   */
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Store token if login successful
      if (response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} User data and token
   */
  async register(userData) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      
      // Store token if registration successful
      if (response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   * @returns {Promise}
   */
  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      removeAuthToken();
      return { success: true };
    } catch (error) {
      // Clear local data even if API call fails
      removeAuthToken();
      throw error;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise} User data
   */
  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise}
   */
  async forgotPassword(email) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token
   * @param {Object} data - { token, password }
   * @returns {Promise}
   */
  async resetPassword(data) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email with token
   * @param {string} token
   * @returns {Promise}
   */
  async verifyEmail(token) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Get stored token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get stored user
   * @returns {Object|null}
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
