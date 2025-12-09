// src/services/transaction.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const transactionService = {
    /**
     * Get a list of transactions with optional query parameters.
     * @param {object} params - Optional parameters for pagination, filtering, and sorting.
     */
    getTransactions: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/', { params });
    },

    /**
     * Get a single transaction by its ID.
     * @param {number} id - The ID of the transaction.
     */
    getTransactionById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/'}?id=${id}`);
    },

    /**
     * Get transactions for a specific order.
     * @param {number} orderId - The order ID.
     */
    getTransactionsByOrderId: async (orderId) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/'}?order_id=${orderId}`);
    },

    /**
     * Create a new transaction.
     * @param {Object} transactionData - Data for the new transaction.
     */
    createTransaction: async (transactionData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/', transactionData);
    },

    /**
     * Update a transaction.
     * @param {number} id - The ID of the transaction to update.
     * @param {Object} transactionData - Updated transaction data.
     */
    updateTransaction: async (id, transactionData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/'}?id=${id}`, transactionData);
    },

    /**
     * Delete a transaction.
     * @param {number} id - The ID of the transaction to delete.
     */
    deleteTransaction: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.TRANSACTIONS || '/modules/transactions/api/'}?id=${id}`);
    },
};
