// src/pages/home/views/OrderList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { orderService } from '@/services/order.service';
import { useAuth } from '@/hooks/useAuth.hook';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { IconShoppingCart, IconClock, IconCheck, IconX, IconEye, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const OrderList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10); // Orders per page
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError('');
        if (!user || !user.id) {
            setError('User not authenticated.');
            setLoading(false);
            return;
        }
        try {
            const response = await orderService.getOrders({
                page: currentPage,
                limit: limit,
                user_id: user.id // Filter orders by authenticated user's ID
            });
            if (response.success) {
                setOrders(response.data.data || []); // Correctly extract orders
                setTotalPages(response.data.pagination.totalPages || 1);
                setTotalItems(response.data.pagination.totalItems || 0); // Set totalItems
            } else {
                throw new Error(response.message || 'Failed to fetch orders');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching orders.');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [user, currentPage, limit]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <BasePage title="My Orders">
            <Helmet>
                <meta name="description" content="View your order history on BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">My Order History</h1>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading your orders...</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{new Date(order.created_at * 1000).toLocaleDateString()}</td>
                                                <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge bg-${
                                                        order.status === 'completed' ? 'success' :
                                                        order.status === 'pending' ? 'warning' :
                                                        'danger'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/profile/orders/${order.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="View Order">
                                                        <IconEye />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer d-flex align-items-center">
                                <p className="m-0 text-muted">Showing <span>{(currentPage - 1) * limit + 1}</span> to <span>{Math.min(currentPage * limit, totalItems)}</span> of <span>{totalItems}</span> entries</p>
                                <ul className="pagination m-0 ms-auto">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" tabIndex="-1" onClick={handlePreviousPage}>
                                            <IconChevronLeft className="icon" />
                                            prev
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={handleNextPage}>
                                            next
                                            <IconChevronRight className="icon" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty-img">
                            <IconShoppingCart className="icon" style={{ width: '4rem', height: '4rem' }} />
                        </div>
                        <p className="empty-title">You have no orders yet!</p>
                        <p className="empty-subtitle">It looks like you haven't placed any orders. Start shopping now!</p>
                        <div className="empty-action">
                            <Link to="/" className="btn btn-primary">
                                Browse Books
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default OrderList;
