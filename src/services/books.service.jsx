// src/services/book.service.jsx
import axiosInstance from './axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const booksService = {
    /**
     * Get a list of books with optional query parameters.
     * @param {object} params - Optional parameters for pagination, filtering, and sorting.
     * @param {number} params.page - The page number to retrieve.
     * @param {number} params.pageSize - The number of items per page.
     * @param {string} params.search - A search term to filter by title.
     * @param {number} params.category_id - The ID of the category to filter by.
     * @param {string} params.sortBy - The field to sort by.
     * @param {string} params.sortOrder - The sort order ('ASC' or 'DESC').
     */
    getBooks: async (params = {}) => {
        return await axiosInstance.get(API_CONFIG.ENDPOINTS.BOOKS, { params });
    },

    /**
     * Get a single book by its ID.
     * @param {number} id - The ID of the book.
     */
    getBookById: async (id) => {
        return await axiosInstance.get(`${API_CONFIG.ENDPOINTS.BOOKS}?id=${id}`);
    },

    /**
     * Create a new book.
     * @param {Object} bookData - Data for the new book.
     */
    createBook: async (bookData) => {
        // Backend expects FormData for file uploads, so convert bookData
        const formData = new FormData();
        for (const key in bookData) {
            if (Object.prototype.hasOwnProperty.call(bookData, key)) {
                if (key === 'images' && Array.isArray(bookData[key])) {
                    bookData[key].forEach(file => formData.append('images[]', file));
                } else {
                    formData.append(key, bookData[key]);
                }
            }
        }
        // axiosInstance default content-type is application/json,
        // so we need to override it for FormData to let browser set boundary
        return await axiosInstance.post(API_CONFIG.ENDPOINTS.BOOKS, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * Update an existing book.
     * @param {number} id - The ID of the book to update.
     * @param {Object} bookData - Data for the book update.
     */
    updateBook: async (id, bookData) => {
        // Backend expects FormData for file uploads, so convert bookData
        const formData = new FormData();
        for (const key in bookData) {
            if (Object.prototype.hasOwnProperty.call(bookData, key)) {
                if (key === 'images' && Array.isArray(bookData[key])) {
                    bookData[key].forEach(file => formData.append('images[]', file));
                } else {
                    formData.append(key, bookData[key]);
                }
            }
        }
        // axiosInstance default content-type is application/json,
        // so we need to override it for FormData to let browser set boundary
        return await axiosInstance.post(`${API_CONFIG.ENDPOINTS.BOOKS}?id=${id}`, formData, { // Backend PUT expects POST with _method=PUT for files
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT' // Inform backend it's a PUT operation
            },
        });
    },

    /**
     * Delete a book.
     * @param {number} id - The ID of the book to delete.
     */
    deleteBook: async (id) => {
        return await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.BOOKS}?id=${id}`);
    }
};
