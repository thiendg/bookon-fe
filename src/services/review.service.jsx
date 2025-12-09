// src/services/review.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const reviewService = {
    /**
     * Get a list of reviews with optional query parameters.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {number} params.book_id - Filter reviews by book ID.
     * @param {number} params.user_id - Filter reviews by user ID.
     * @param {number} params.rating - Filter reviews by a specific rating.
     */
    getReviews: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.REVIEWS, { params });
    },

    /**
     * Get a single review by its ID.
     * @param {number} id - The ID of the review.
     */
    getReviewById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.REVIEWS}?id=${id}`);
    },

    /**
     * Create a new review.
     * @param {Object} reviewData - Data for the new review (book_id, user_id, rating, comment).
     */
    createReview: async (reviewData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.REVIEWS, reviewData);
    },

    /**
     * Update an existing review.
     * @param {number} id - The ID of the review to update.
     * @param {Object} reviewData - Data for the review update (rating, comment).
     */
    updateReview: async (id, reviewData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.REVIEWS}?id=${id}`, reviewData);
    },

    /**
     * Delete a review.
     * @param {number} id - The ID of the review to delete.
     */
    deleteReview: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.REVIEWS}?id=${id}`);
    }
};
