// src/services/category.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const categoryService = {
    /**
     * Get a list of categories with optional query parameters.
     * @param {object} params - Optional parameters for pagination, filtering, and sorting.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page. (Backend uses 'limit' not 'pageSize')
     * @param {string} params.search - A search term to filter by name.
     * @param {number} params.parent_id - The ID of the parent category to filter by.
     */
    getCategories: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.CATEGORIES, { params });
    },

    /**
     * Get a single category by its ID.
     * @param {number} id - The ID of the category.
     */
    getCategoryById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.CATEGORIES}?id=${id}`);
    },

    /**
     * Create a new category.
     * @param {Object} categoryData - Data for the new category (name, parent_id).
     */
    createCategory: async (categoryData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.CATEGORIES, categoryData);
    },

    /**
     * Update an existing category.
     * @param {number} id - The ID of the category to update.
     * @param {Object} categoryData - Data for the category update.
     */
    updateCategory: async (id, categoryData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.CATEGORIES}?id=${id}`, categoryData);
    },

    /**
     * Delete a category.
     * @param {number} id - The ID of the category to delete.
     */
    deleteCategory: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.CATEGORIES}?id=${id}`);
    }
};
