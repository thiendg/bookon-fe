// src/config/api.config.js
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost/bookon-be/',
    TIMEOUT: 10000,
    ENDPOINTS: {
        // Auth endpoints - matching backend structure
        REGISTER: '/modules/auth/api/register.php',
        VERIFY_EMAIL: '/modules/auth/api/verify-email.php',
        LOGIN: '/modules/auth/api/login.php',
        LOGOUT: '/modules/auth/api/logout.php',
        CHECK_AUTH: '/modules/auth/api/check-auth.php',
        FORGOT_PASSWORD: '/modules/auth/api/forgot-password.php',
        RESET_PASSWORD: '/modules/auth/api/reset-password.php',

        // Book endpoints
        BOOKS: '/modules/books/api/',

        // User endpoints
        USERS: '/modules/users/api/',

        // Category endpoints
        CATEGORIES: '/modules/categories/api/',
        CATEGORY_SELECT_OPTIONS: '/modules/categories/api/?action=select', // Corrected endpoint

        // Order endpoints
        ORDERS: '/modules/orders/api/',

        // Review endpoints
        REVIEWS: '/modules/reviews/api/',

        // Role endpoints
        ROLES: '/modules/roles/api/',

        // Post endpoints
        POSTS: '/modules/posts/api/',

        // Post Comments endpoints
        POST_COMMENTS: '/modules/post_comments/api/',

        // Settings endpoints
        SETTINGS: '/modules/settings/api/',

        // Contact endpoints
        CONTACTS: '/modules/contacts/api/',

        // FAQs endpoints
        FAQS: '/modules/faqs/api/',

        // Files upload endpoint (backend provides only upload.php)
        FILES: '/modules/files/api/upload.php',

        // Sessions endpoints
        SESSIONS: '/modules/sessions/api/',

        // Transactions endpoints
        TRANSACTIONS: '/modules/transactions/api/',
    }
};