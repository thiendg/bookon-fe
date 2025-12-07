// src/services/dashboard.service.jsx
// Dashboard service: build aggregated data from existing module endpoints
// The backend preview doesn't provide a single /dashboard/stats endpoint,
// so we compute light-weight aggregates client-side by calling list endpoints
// that already return pagination metadata.
import { usersService } from './users.service';
import { booksService } from './books.service';
import { orderService } from './order.service';
import { transactionService } from './transaction.service';

const _unwrap = (resp) => {
    // Normalize different response shapes coming from axiosInstance and backend.
    // Possible shapes:
    // 1) { success, message, data: { data: [...], pagination: {...} } }
    // 2) { data: [...], pagination: {...} }
    // 3) { data: [...] }
    // 4) [...] (direct array)
    if (!resp) return {};
    if (Array.isArray(resp)) return resp;
    if (resp.data && (Array.isArray(resp.data) || resp.data.pagination || resp.data.data)) {
        return resp.data;
    }
    return resp;
};

const safeTotalFromPagination = (resp) => {
    const d = _unwrap(resp);
    if (!d) return 0;
    if (d.pagination?.totalItems) return d.pagination.totalItems;
    if (Array.isArray(d.data)) return d.data.length;
    if (Array.isArray(d)) return d.length;
    return 0;
};

export const dashboardService = {
    /**
     * Get aggregated dashboard stats (counts and simple metrics).
     * Returns object: { totalUsers, totalBooks, totalOrders, totalRevenue, newUsersToday, newOrdersToday, pendingOrders }
     */
    getStats: async () => {
        try {
            const [usersResp, booksResp, ordersResp, transactionsResp] = await Promise.all([
                usersService.getUsers({ limit: 1 }).catch(() => ({ data: [], pagination: { totalItems: 0 } })),
                booksService.getBooks({ limit: 1 }).catch(() => ({ data: [], pagination: { totalItems: 0 } })),
                orderService.getOrders({ limit: 10 }).catch(() => ({ data: [], pagination: { totalItems: 0 } })),
                transactionService.getTransactions({ limit: 100 }).catch(() => ({ data: [] })),
            ]);

            const totalUsers = safeTotalFromPagination(usersResp);
            const totalBooks = safeTotalFromPagination(booksResp);
            const totalOrders = safeTotalFromPagination(ordersResp);

            // Compute total revenue from transactions (sum of amount for completed transactions)
            // Calculate revenue from transactions array (normalize shapes)
            let totalRevenue = 0;
            const txData = _unwrap(transactionsResp).data.posts;
            if (Array.isArray(txData)) {
                totalRevenue = txData.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
            } else if (Array.isArray(txData.data)) {
                totalRevenue = txData.data.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
            }

            // Basic placeholders for daily/new counts — backend would be better
            const newUsersToday = 0;
            const newOrdersToday = 0;

            // pending orders count from ordersResp.data if available
            let pendingOrders = 0;
            const ordersData = _unwrap(ordersResp);
            if (Array.isArray(ordersData)) {
                pendingOrders = ordersData.filter(o => (o.status || '').toLowerCase() === 'pending').length;
            } else if (Array.isArray(ordersData.data)) {
                pendingOrders = ordersData.data.filter(o => (o.status || '').toLowerCase() === 'pending').length;
            }

            return {
                data: {
                    totalUsers,
                    totalBooks,
                    totalOrders,
                    totalRevenue,
                    newUsersToday,
                    newOrdersToday,
                    pendingOrders,
                },
            };
        } catch (err) {
            return { data: {} };
        }
    },

    /**
     * Get a simple list of top books. Backend does not provide an aggregated "top selling" endpoint
     * in the preview, so we return most recently added books as a proxy.
     */
    getTopBooks: async (limit = 5) => {
        try {
            const resp = await booksService.getBooks({ pageSize: limit, withSales: 1 }).catch(() => ({ data: [] }));
            const d = _unwrap(resp);
            return { data: Array.isArray(d) ? d : d.data || [] };
        } catch (err) {
            return { data: [] };
        }
    },

    // Keep compatibility stubs for other callers
    getRevenueStats: async () => ({ data: {} }),
    getOrderStats: async () => ({ data: {} }),
    getUserStats: async () => ({ data: {} }),
    getRecentActivities: async () => ({ data: [] }),
};
