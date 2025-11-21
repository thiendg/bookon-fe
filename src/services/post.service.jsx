// src/services/post.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const postService = {
    /**
     * Get a list of posts with optional query parameters.
     * @param {object} params - Optional parameters for pagination, filtering, and sorting.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {string} params.search - A search term to filter by title.
     * @param {number} params.category_id - The ID of the category to filter by.
     * @param {number} params.user_id - The ID of the user to filter by.
     */
    getPosts: async (params = {}) => {
        const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.POSTS, { params });
        console.log(response)
        return response

    },

    /**
     * Get a single post by its ID.
     * @param {number} id - The ID of the post.
     */
    getPostById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.POSTS}?id=${id}`);
    },

    /**
     * Create a new post.
     * @param {Object} postData - Data for the new post (title, content, user_id).
     */
    createPost: async (postData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.POSTS, postData);
    },

    /**
     * Update an existing post.
     * @param {number} id - The ID of the post to update.
     * @param {Object} postData - Data for the post update.
     */
    updatePost: async (id, postData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.POSTS}?id=${id}`, postData);
    },

    /**
     * Delete a post.
     * @param {number} id - The ID of the post to delete.
     */
    deletePost: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.POSTS}?id=${id}`);
    },

    /**
     * Retrieves posts formatted for select/dropdown inputs.
     * @param {object} params - Optional filters to apply to the query.
     */
    getPostSelectOptions: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.POSTS, { params: { ...params, action: 'select' } });
    }
};
