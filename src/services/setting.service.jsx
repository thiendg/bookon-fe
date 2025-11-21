// src/services/setting.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const settingService = {
    /**
     * Get a list of settings with optional query parameters.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {string} params.key - Filter by setting key.
     */
    getSettings: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.SETTINGS, { params });
    },

    /**
     * Get a single setting by its ID or key.
     * @param {number|string} idOrKey - The ID or key of the setting.
     */
    getSettingByIdOrKey: async (idOrKey) => {
        // Backend's getSetting method handles both numeric ID and string key
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.SETTINGS}?id=${idOrKey}`);
    },

    /**
     * Create a new setting.
     * @param {Object} settingData - Data for the new setting (setting_key, setting_value).
     */
    createSetting: async (settingData) => {
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.SETTINGS, settingData);
    },

    /**
     * Update an existing setting.
     * @param {number|string} idOrKey - The ID or key of the setting to update.
     * @param {Object} settingData - Data for the setting update (setting_value).
     */
    updateSetting: async (idOrKey, settingData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.SETTINGS}?id=${idOrKey}`, settingData);
    },

    /**
     * Delete a setting.
     * @param {number|string} idOrKey - The ID or key of the setting to delete.
     */
    deleteSetting: async (idOrKey) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.SETTINGS}?id=${idOrKey}`);
    }
};
