// src/services/faq.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const faqService = {
    /**
     * Get a list of FAQs with optional query parameters.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {string} params.search - Filter by question text.
     */
    getFaqs: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.FAQS, { params });
    },

    /**
     * Get a single FAQ by its ID.
     * @param {number} id - The ID of the FAQ.
     */
    getFaqById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.FAQS}?id=${id}`);
    },

    /**
     * Create a new FAQ.
     * @param {Object} faqData - Data for the new FAQ (question, answer).
     */
    createFaq: async (faqData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.FAQS, faqData);
    },

    /**
     * Update an existing FAQ.
     * @param {number} id - The ID of the FAQ to update.
     * @param {Object} faqData - Data for the FAQ update (question, answer).
     */
    updateFaq: async (id, faqData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.FAQS}?id=${id}`, faqData);
    },

    /**
     * Delete an FAQ.
     * @param {number} id - The ID of the FAQ to delete.
     */
    deleteFaq: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.FAQS}?id=${id}`);
    }
};
