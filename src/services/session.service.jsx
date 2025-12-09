// src/services/session.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const sessionService = {
    /**
     * Get a list of active sessions for the authenticated user.
     * @param {object} params - Optional parameters for pagination.
     */
    getSessions: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.SESSIONS || '/modules/sessions/api/', { params });
    },

    /**
     * Get all sessions (admin only).
     * @param {object} params - Optional parameters for pagination and filtering.
     */
    getAllSessions: async (params = {}) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.SESSIONS || '/modules/sessions/api/'}?all=true`, { params });
    },

    /**
     * Get a single session by its ID.
     * @param {string} sessionId - The session ID.
     */
    getSessionById: async (sessionId) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.SESSIONS || '/modules/sessions/api/'}?id=${sessionId}`);
    },

    /**
     * Delete/logout a specific session.
     * @param {string} sessionId - The session ID to terminate.
     */
    deleteSession: async (sessionId) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.SESSIONS || '/modules/sessions/api/'}?id=${sessionId}`);
    },

    /**
     * Delete all sessions except current one.
     */
    logoutAllOtherSessions: async () => {
        return await axiosInstance.post(`${API_CONFIG.ENDPOINTS.SESSIONS || '/modules/sessions/api/'}?action=logout_others`);
    },
};
