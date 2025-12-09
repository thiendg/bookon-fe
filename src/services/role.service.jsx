// src/services/role.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const roleService = {
    /**
     * Get a list of roles with optional query parameters.
     * @param {object} params - Optional parameters for pagination.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.pageSize - The number of items per page.
     */
    getRoles: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.ROLES, { params });
    },

    /**
     * Get a single role by its ID.
     * @param {number} id - The ID of the role.
     */
    getRoleById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.ROLES}?id=${id}`);
    },

    /**
     * Create a new role.
     * @param {Object} roleData - Data for the new role (name, permissions).
     */
    createRole: async (roleData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.ROLES, roleData);
    },

    /**
     * Update an existing role.
     * @param {number} id - The ID of the role to update.
     * @param {Object} roleData - Data for the role update (name, permissions).
     */
    updateRole: async (id, roleData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.ROLES}?id=${id}`, roleData);
    },

    /**
     * Delete a role.
     * @param {number} id - The ID of the role to delete.
     */
    deleteRole: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.ROLES}?id=${id}`);
    }
};
