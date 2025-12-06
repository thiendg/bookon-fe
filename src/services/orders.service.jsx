// src/services/orders.service.jsx
import axiosInstance from './axiosInstance';

export const ordersService = {
    create: async (payload) => {
        return await axiosInstance.post('/modules/orders/api/index.php', payload);
    },

    list: async ({ page = 1, limit = 10, status, user_id } = {}) => {
        const params = { page, limit };
        if (status) params.status = status;
        if (user_id) params.user_id = user_id;

        return await axiosInstance.get('/modules/orders/api/index.php', { params });
    },

    get: async (id) => {
        return await axiosInstance.get('/modules/orders/api/index.php', {
            params: { id },
        });
    },

    update: async (id, data) => {
        return await axiosInstance.put('/modules/orders/api/index.php', data, {
            params: { id },
        });
    },

    updateStatus: async (id, status) => {
        return await ordersService.update(id, { status });
    },

    remove: async (id) => {
        return await axiosInstance.delete('/modules/orders/api/index.php', {
            params: { id },
        });
    },
};
