// src/services/setting.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const settingService = {
    /**
     * Get all settings.
     */
    getAllSettings: async () => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.SETTINGS);
    },

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
        // Use FormData to support file uploads or array values if provided
        const formData = new FormData();
        for (const key in settingData) {
            if (Object.prototype.hasOwnProperty.call(settingData, key)) {
                if (Array.isArray(settingData[key])) {
                    settingData[key].forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, settingData[key]);
                }
            }
        }

        return await axiosInstance.post(API_CONFIG.ENDPOINTS.SETTINGS, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * Update an existing setting.
     * @param {number|string} idOrKey - The ID or key of the setting to update.
     * @param {Object} settingData - Data for the setting update (setting_value).
     */
    updateSetting: async (idOrKey, settingData) => {
        // Use FormData to support file uploads or array values and use method override for PUT
        const formData = new FormData();
        for (const key in settingData) {
            if (Object.prototype.hasOwnProperty.call(settingData, key)) {
                if (Array.isArray(settingData[key])) {
                    settingData[key].forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, settingData[key]);
                }
            }
        }

        return await axiosInstance.post(`${API_CONFIG.ENDPOINTS.SETTINGS}?id=${idOrKey}`, formData, {
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
        });
    },

    /**
     * Delete a setting.
     * @param {number|string} idOrKey - The ID or key of the setting to delete.
     */
    deleteSetting: async (idOrKey) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.SETTINGS}?id=${idOrKey}`);
    }
};
