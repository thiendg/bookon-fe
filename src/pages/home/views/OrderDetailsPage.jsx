// src/pages/home/views/OrderDetailsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { orderService } from '@/services/order.service';
import { useAuth } from '@/hooks/useAuth.hook';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconShoppingCart, IconClock, IconCheck, IconX, IconArrowLeft } from '@tabler/icons-react';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrderDetails = useCallback(async () => {
        setLoading(true);
        setError('');
        if (!user || !user.id) {
            setError('User not authenticated.');
            setLoading(false);
            return;
        }
        try {
            const response = await orderService.getOrderById(orderId);
            if (response.success) {
                // Ensure the order belongs to the authenticated user for security
                if (response.data.user_id === user.id) {
                    setOrder(response.data);
                } else {
                    setError('Access denied: This order does not belong to you.');
                    setOrder(null);
                }
            } else {
                throw new Error(response.message || 'Failed to fetch order details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching order details.');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    }, [orderId, user]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    if (loading) {
        return (
            <BasePage title="Loading Order">
                <div className="container mx-auto px-4 py-8 text-center">Loading order details...</div>
            </BasePage>
        );
    }

    if (error && !order) {
        return (
            <BasePage title="Order Error">
                <div className="container mx-auto px-4 py-8 text-center text-red-600">
                    <p className="mb-3">Error: {error}</p>
                    <Link to="/profile/orders" className="btn btn-primary">Back to Order History</Link>
                </div>
            </BasePage>
        );
    }

    if (!order) {
        return (
            <BasePage title="Order Not Found">
                <div className="container mx-auto px-4 py-8 text-center text-red-600">
                    <p className="mb-3">Order not found or access denied.</p>
                    <Link to="/profile/orders" className="btn btn-primary">Back to Order History</Link>
                </div>
            </BasePage>
        );
    }

    return (
        <BasePage title={`Order #${order.id}`}>
            <Helmet>
                <meta name="description" content={`Details for order ${order.id} on BookOn.`} />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="d-flex align-items-center mb-4">
                    <Link to="/profile/orders" className="btn btn-ghost d-none d-sm-inline-block me-3">
                        <IconArrowLeft className="icon" />
                        Back to Orders
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900">Order Details # {order.id}</h1>
                </div>

                <div className="row row-cards">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Order Information</h3>
                            </div>
                            <div className="card-body">
                                <p><strong>Order Date:</strong> {new Date(order.created_at * 1000).toLocaleString()}</p>
                                <p><strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                                <p>
                                    <strong>Status:</strong> <span className={`badge bg-${
                                        order.status === 'completed' ? 'success' :
                                        order.status === 'pending' ? 'warning' :
                                        'danger'
                                    }`}>{order.status}</span>
                                </p>
                                {/* Add more order details like shipping address, payment method etc. */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Customer Information</h3>
                            </div>
                            <div className="card-body">
                                <p><strong>Customer ID:</strong> {order.user_id}</p>
                                <p><strong>Customer Name:</strong> {user?.full_name}</p> {/* Assuming user in context is the current order user */}
                                <p><strong>Customer Email:</strong> {user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder for Order Items */}
                <div className="card mt-4">
                    <div className="card-header">
                        <h3 className="card-title">Items in Order</h3>
                    </div>
                    <div className="card-body">
                        <p>Order items will be displayed here. (Requires backend API for order items)</p>
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
                                {/* Loop through order items *}
                                {/*
                                {order.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.book_title}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                                */}
                            {/* </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </BasePage>
    );
};

export default OrderDetailsPage;
