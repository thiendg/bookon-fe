// src/services/users.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const usersService = {
    /**
     * Get a list of users with optional query parameters.
     * @param {object} params - Optional parameters for pagination, filtering, and sorting.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.pageSize - The number of items per page.
     * @param {string} params.search - A search term to filter by email or full_name. (Backend might not support search on both, need to check UserModel)
     * @param {number} params.role_id - The ID of the role to filter by.
     * @param {string} params.status - The status to filter by (e.g., 'active', 'unverified').
     * @param {string} params.sortBy - The field to sort by.
     * @param {string} params.sortOrder - The sort order ('ASC' or 'DESC').
     */
    getUsers: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.USERS, { params });
    },

    /**
     * Get a single user by their ID.
     * @param {number} id - The ID of the user.
     */
    getUserById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.USERS}?id=${id}`);
    },

    /**
     * Create new user
     * @param {Object} userData - User data for creation.
     */
    createUser: async (userData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.USERS, userData);
    },

    /**
     * Update user
     * @param {number} id - The ID of the user to update.
     * @param {Object} userData - User data for update.
     */
    updateUser: async (id, userData) => {
        // If userData contains a file for the avatar, use FormData
        if (userData.avatar) {
            const formData = new FormData();
            for (const key in userData) {
                if (Object.prototype.hasOwnProperty.call(userData, key)) {
                    // The backend will handle a single file upload for 'avatar'
                    if (key === 'avatar') {
                        formData.append('avatar', userData[key]);
                    } else {
                        formData.append(key, userData[key]);
                    }
                }
            }

            // Use POST with method override for multipart/form-data PUT
            return await axiosInstance.post(`${API_CONFIG.ENDPOINTS.USERS}?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT'
                },
            });
        } else {
            // Otherwise, send as plain JSON
            return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.USERS}?id=${id}`, userData);
        }
    },

    /**
     * Delete user
     * @param {number} id - The ID of the user to delete.
     */
    deleteUser: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.USERS}?id=${id}`);
    }
};