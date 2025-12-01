/**
 * Product API Service
 * 
 * Handles all product-related API calls
 */

import { api } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/api.config';

class ProductService {
  /**
   * Get all products
   * @param {Object} params - Query parameters (page, limit, category, search, etc.)
   * @returns {Promise} Products list
   */
  async getAllProducts(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.BASE, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} Product data
   */
  async getProductById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_PRODUCT(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  async searchProducts(query) {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get featured products
   * @returns {Promise} Featured products
   */
  async getFeaturedProducts() {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.FEATURED);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get products by category
   * @param {string} category - Category slug
   * @returns {Promise} Products in category
   */
  async getProductsByCategory(category) {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(category));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new product (Admin only)
   * @param {Object} productData - Product information
   * @returns {Promise} Created product
   */
  async createProduct(productData) {
    try {
      const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update product (Admin only)
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product information
   * @returns {Promise} Updated product
   */
  async updateProduct(id, productData) {
    try {
      const response = await api.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete product (Admin only)
   * @param {string} id - Product ID
   * @returns {Promise} Success message
   */
  async deleteProduct(id) {
    try {
      const response = await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
