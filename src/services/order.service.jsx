// src/services/order.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const orderService = {
    /**
     * Get a list of orders for the authenticated user.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {string} params.status - Filter by order status.
     */
    getOrders: async (params = {}) => {
        // The backend automatically filters by authenticated user's ID
        // when AuthMiddleware is active and a non-admin user queries their orders.
        // Or, we explicitly pass user_id if this service is also for admin listing all orders
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.ORDERS, { params });
    },

    /**
     * Get a single order by its ID for the authenticated user.
     * @param {number} id - The ID of the order.
     */
    getOrderById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.ORDERS}?id=${id}`);
    },

    /**
     * Create a new order. (Typically used after checkout)
     * @param {Object} orderData - Data for the new order.
     */
    createOrder: async (orderData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.ORDERS, orderData);
    },

    /**
     * Update an existing order. (Admin function)
     * @param {number} id - The ID of the order to update.
     * @param {Object} orderData - Data for the order update.
     */
    updateOrder: async (id, orderData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.ORDERS}?id=${id}`, orderData);
    },

    /**
     * Delete an order. (Admin function)
     * @param {number} id - The ID of the order to delete.
     */
    deleteOrder: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.ORDERS}?id=${id}`);
    }
};
