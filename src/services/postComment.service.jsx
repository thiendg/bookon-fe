// src/services/postComment.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const postCommentService = {
    /**
     * Get a list of post comments with optional query parameters.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {number} params.post_id - Filter comments by post ID.
     * @param {number} params.user_id - Filter comments by user ID.
     */
    getPostComments: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.POST_COMMENTS, { params });
    },

    /**
     * Get a single post comment by its ID.
     * @param {number} id - The ID of the post comment.
     */
    getPostCommentById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.POST_COMMENTS}?id=${id}`);
    },

    /**
     * Create a new post comment.
     * @param {Object} postCommentData - Data for the new post comment (post_id, user_id, comment_text).
     */
    createPostComment: async (postCommentData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.POST_COMMENTS, postCommentData);
    },

    /**
     * Update an existing post comment.
     * @param {number} id - The ID of the post comment to update.
     * @param {Object} postCommentData - Data for the post comment update (comment_text).
     */
    updatePostComment: async (id, postCommentData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.POST_COMMENTS}?id=${id}`, postCommentData);
    },

    /**
     * Delete a post comment.
     * @param {number} id - The ID of the post comment to delete.
     */
    deletePostComment: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.POST_COMMENTS}?id=${id}`);
    }
};
