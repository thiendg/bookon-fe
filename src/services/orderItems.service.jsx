// src/services/orderItems.service.jsx
import axiosInstance from './axiosInstance';

export const orderItemsService = {
    create: async ({ order_id, book_id, quantity, price_at_purchase }) => {
        return await axiosInstance.post('/modules/order_items/api/index.php', {
            order_id,
            book_id,
            quantity,
            price_at_purchase,
        });
    },

    listByOrder: async (order_id, { page = 1, limit = 100 } = {}) => {
        const params = { order_id, page, limit };
        return await axiosInstance.get('/modules/order_items/api/index.php', { params });
    },
};
