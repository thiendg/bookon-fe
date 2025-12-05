
import React, { useEffect, useState } from 'react';
import BasePage from '@/components/BasePage';
import { ordersService } from '@/services/orders.service';

const statusOptions = [
    'pending',
    'processing',
    'shipped',
    'completed',
    'cancelled',
    'refunded',
];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadOrders = async (pageToLoad = 1) => {
        try {
            setLoading(true);
            setError('');
            const res = await ordersService.list({
                page: pageToLoad,
                limit,
                status: statusFilter || undefined,
            });

            if (!res.success) {
                setError(res.message || 'Không tải được danh sách đơn hàng');
                return;
            }

            setOrders(res.data.orders || []);
            setPage(res.data.page || pageToLoad);
            setTotal(res.data.total || 0);
        } catch (err) {
            setError(err.message || 'Lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setLoading(true);
            setError('');
            await ordersService.updateStatus(orderId, newStatus);
            await loadOrders(page);
        } catch (err) {
            setError(err.message || 'Không cập nhật được trạng thái');
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <BasePage title="Quản lý đơn hàng" currentPage="home">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <div className="flex items-center gap-2 mb-4">
                    <span>Lọc theo trạng thái:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-1"
                    >
                        <option value="">Tất cả</option>
                        {statusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-white rounded-3xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Khách hàng</th>
                                <th className="p-2 text-left">Liên hệ</th>
                                <th className="p-2 text-right">Tổng tiền</th>
                                <th className="p-2 text-left">Trạng thái</th>
                                <th className="p-2 text-left">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id} className="border-t">
                                    <td className="p-2">{o.id}</td>
                                    <td className="p-2">
                                        {o.customer_name}
                                        <div className="text-xs text-gray-500">
                                            user_id: {o.user_id ?? 'guest'}
                                        </div>
                                    </td>
                                    <td className="p-2 text-xs text-gray-700">
                                        <div>{o.customer_email}</div>
                                        <div>{o.customer_phone}</div>
                                    </td>
                                    <td className="p-2 text-right">
                                        {Number(o.total_amount).toLocaleString('vi-VN')} ₫
                                    </td>
                                    <td className="p-2">
                                        <span className="inline-block px-2 py-1 rounded-full bg-gray-100">
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <select
                                            value={o.status}
                                            onChange={(e) =>
                                                handleStatusChange(o.id, e.target.value)
                                            }
                                            className="border rounded-lg px-2 py-1 text-xs"
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            disabled={page <= 1}
                            onClick={() => loadOrders(page - 1)}
                        >
                            &laquo;
                        </button>
                        <span className="px-2 py-1 text-sm">
                            Trang {page} / {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            disabled={page >= totalPages}
                            onClick={() => loadOrders(page + 1)}
                        >
                            &raquo;
                        </button>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default AdminOrders;
