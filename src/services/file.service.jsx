// src/services/file.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const fileService = {
    /**
     * Upload a new file using backend's `upload.php` endpoint.
     * Backend response format: { success: true, message: string, data: { file_path } }
     * @param {File} file - The file to upload.
     * @param {Object} metadata - Additional metadata for the file.
     */
    uploadFile: async (file, metadata = {}) => {
        const formData = new FormData();
        formData.append('file', file);

        // Add any additional metadata
        Object.keys(metadata).forEach(key => {
            formData.append(key, metadata[key]);
        });

        // Use the explicit upload endpoint
        const uploadUrl = API_CONFIG.ENDPOINTS.FILES || '/modules/files/api/upload.php';
        return await axiosInstance.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
