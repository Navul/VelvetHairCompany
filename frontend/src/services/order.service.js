/**
 * Order API Service
 * 
 * Handles all order-related API calls
 */

import { api } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/api.config';

class OrderService {
  /**
   * Create new order
   * @param {Object} orderData - Order information
   * @returns {Promise} Created order
   */
  async createOrder(orderData) {
    try {
      const response = await api.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single order by ID
   * @param {string} id - Order ID
   * @returns {Promise} Order data
   */
  async getOrderById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.GET_ORDER(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user's orders
   * @returns {Promise} User's orders
   */
  async getMyOrders() {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.MY_ORDERS);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all orders (Admin only)
   * @param {Object} params - Query parameters (page, limit, status, etc.)
   * @returns {Promise} All orders
   */
  async getAllOrders(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.BASE, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update order status (Admin only)
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {Promise} Updated order
   */
  async updateOrderStatus(id, status) {
    try {
      const response = await api.patch(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel order
   * @param {string} id - Order ID
   * @returns {Promise} Cancelled order
   */
  async cancelOrder(id) {
    try {
      const response = await api.post(API_ENDPOINTS.ORDERS.CANCEL(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
