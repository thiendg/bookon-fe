// src/services/contact.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const contactService = {
    /**
     * Get a list of contact messages with optional query parameters.
     * @param {object} params - Optional parameters for pagination and filtering.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.limit - The number of items per page.
     * @param {string} params.status - Filter by status (e.g., 'pending', 'read', 'responded').
     */
    getContacts: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.CONTACTS, { params });
    },

    /**
     * Get a single contact message by its ID.
     * @param {number} id - The ID of the contact message.
     */
    getContactById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.CONTACTS}?id=${id}`);
    },

    /**
     * Create a new contact message (publicly accessible).
     * @param {Object} contactData - Data for the new contact message (name, email, message).
     */
    createContact: async (contactData) => {
        // This endpoint is public, so no Auth header is sent by axiosInstance
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.CONTACTS, contactData);
    },

    /**
     * Update an existing contact message (e.g., mark as read/responded).
     * @param {number} id - The ID of the contact message to update.
     * @param {Object} contactData - Data for the contact message update (status).
     */
    updateContact: async (id, contactData) => {
        return await axiosInstance.put(`${API_CONFIG.ENDPOINTS.CONTACTS}?id=${id}`, contactData);
    },

    /**
     * Delete a contact message.
     * @param {number} id - The ID of the contact message to delete.
     */
    deleteContact: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.CONTACTS}?id=${id}`);
    }
};
