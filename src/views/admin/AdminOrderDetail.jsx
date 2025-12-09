// src/pages/admin/views/AdminOrderDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { orderService } from '@/services/order.service';
import { Helmet } from 'react-helmet-async';
import { IconArrowLeft, IconShoppingCart, IconClock, IconCheck, IconX, IconUser } from '@tabler/icons-react';

const AdminOrderDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false); // For updating order status
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchOrder = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await orderService.getOrderById(id);
            if (response.success) {
                setOrder(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch order details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching order details.');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    const handleUpdateStatus = async (newStatus) => {
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!order || !order.id) {
            setError('Order data not found.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = { status: newStatus };
            console.log(order.id, updateData)
            const response = await orderService.updateOrder(order.id, updateData);
            console.log(response)
            if (response.success) {
                setSuccessMessage('Order status updated successfully!');
                fetchOrder(); // Refresh order data
            } else {
                throw new Error(response.message || 'Failed to update order status');
            }
        } catch (err) {
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || err.message || 'An error occurred during status update.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconShoppingCart className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading order details...</p>
            </div>
        );
    }

    if (error && !order) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load order details. <Link to="/admin/orders">Go back to Order List</Link></p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconShoppingCart className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Order not found</p>
                <p className="empty-subtitle">The order with ID "{id}" does not exist. <Link to="/admin/orders">Go back to Order List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Order #${order.id} Details | Admin - BookOn`}</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <Link to="/admin/orders" className="btn btn-ghost d-none d-sm-inline-block">
                                <IconArrowLeft className="icon" />
                                Back to Orders
                            </Link>
                            <h2 className="page-title">Order Details # {order.id}</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <button className="btn btn-success" onClick={() => handleUpdateStatus('completed')} disabled={submitting || order.status === 'completed'}>
                                    <IconCheck className="icon" /> Mark as Completed
                                </button>
                                <button className="btn btn-danger" onClick={() => handleUpdateStatus('cancelled')} disabled={submitting || order.status === 'cancelled'}>
                                    <IconX className="icon" /> Mark as Cancelled
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Order Information</h3>
                        </div>
                        <div className="card-body">
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Customer ID:</strong> {order.user_id}</p>
                            <p><strong>Total Amount:</strong> ${order.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}</p>
                            <p><strong>Status:</strong> <span className={`badge bg-${order.status === 'completed' ? 'success' :
                                order.status === 'pending' ? 'warning' :
                                    'danger'
                                }`}>{order.status}</span></p>
                            <p><strong>Order Date:</strong> {order.created_at ? new Date(order.created_at * 1000).toLocaleString() : 'N/A'}</p>
                            <p><strong>Last Updated:</strong> {order.updated_at ? new Date(order.updated_at * 1000).toLocaleString() : 'N/A'}</p>
                            {/* Add more details like shipping address, payment info etc. */}
                        </div>
                    </div>
                </div>

                {/* Placeholder for Order Items - Requires backend API for order items */}
                <div className="card mt-4">
                    <div className="card-header">
                        <h3 className="card-title">Items in Order</h3>
                    </div>
                    <div className="card-body">
                        <p>Order items will be displayed here. (Requires separate backend API endpoint for order items)</p>
                        {/* 
                        <table className="table table-vcenter card-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example item *}
                                {/*
                                <tr>
                                    <td>Book Title 1</td>
                                    <td>2</td>
                                    <td>$15.00</td>
                                    <td>$30.00</td>
                                </tr>
                                */}
                        {/* </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrderDetail;
