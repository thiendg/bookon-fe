// src/pages/admin/views/AdminDashboardPage.new.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { dashboardService } from '@/services/dashboard.service';
import { usersService } from '@/services/users.service';
import { booksService } from '@/services/books.service';
import { orderService } from '@/services/order.service';
import {
    IconUsers,
    IconBook,
    IconShoppingCart,
    IconCurrencyDollar,
    IconTrendingUp,
    IconTrendingDown,
    IconRefresh,
    IconMessage,
    IconSettings,
} from '@tabler/icons-react';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBooks: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recentOrders, setRecentOrders] = useState([]);
    const [topBooks, setTopBooks] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError('');

        try {
            // Fetch all data in parallel
            const [usersResponse, booksResponse, ordersResponse, statsResponse] = await Promise.all([
                usersService.getUsers({ limit: 1 }).catch(() => ({ data: [], pagination: { totalItems: 0 } })),
                booksService.getBooks({ limit: 1 }).catch(() => ({ data: [], pagination: { totalItems: 0 } })),
                orderService.getOrders({ limit: 10, sortBy: 'created_at', sortOrder: 'ASC' }).catch(() => ({ data: [] })),
                dashboardService.getStats().catch(() => ({ data: {} })),
            ]);

            // Calculate stats
            const calculatedStats = {
                totalUsers: usersResponse?.totalItem || 0,
                totalBooks: booksResponse?.totalItem || 0,
                totalOrders: ordersResponse?.data.total || ordersResponse.data?.length || 0,
                totalRevenue: statsResponse.data?.totalRevenue || 0
            };
            setStats(calculatedStats);
            setRecentOrders(ordersResponse.data?.posts.slice(0, 5) || []);
            // Fetch top books
            const topBooksResponse = await dashboardService.getTopBooks(5).catch(() => ({ data: [] }));
            // Normalize response to ensure an array is always stored in state
            const tb = topBooksResponse?.data;
            const normalizedTopBooks = Array.isArray(tb) ? tb : (tb?.data || []);
            setTopBooks(normalizedTopBooks);

        } catch (err) {
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount || 0);
    };

    const getOrderStatusBadge = (status) => {
        const statusMap = {
            pending: 'warning',
            processing: 'info',
            shipped: 'primary',
            delivered: 'success',
            cancelled: 'danger',
        };
        return statusMap[status?.toLowerCase()] || 'secondary';
    };

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Dashboard | Admin - BookOn</title>
                </Helmet>
                <div className="page-body">
                    <div className="container-xl">
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading dashboard...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Admin - BookOn</title>
            </Helmet>

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">Dashboard</h2>
                            <div className="text-muted mt-1">Welcome to BookOn Admin Panel</div>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <button onClick={fetchDashboardData} className="btn btn-icon btn-white" disabled={loading}>
                                <IconRefresh className="icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    {error && (
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <div className="d-flex">
                                <div>Error: {error}</div>
                            </div>
                            <button type="button" className="btn-close" onClick={() => setError('')}></button>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="row row-deck row-cards mb-3">
                        {/* Total Users */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Total Users</div>
                                    </div>
                                    <div className="h1 mb-3">{stats.totalUsers.toLocaleString()}</div>
                                    <div className="d-flex mb-2">
                                        <div>
                                            <IconUsers className="text-primary me-2" />
                                            <span className="text-muted small">
                                                {stats.newUsersToday} new today
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Books */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Total Books</div>
                                    </div>
                                    <div className="h1 mb-3">{stats.totalBooks.toLocaleString()}</div>
                                    <div className="d-flex mb-2">
                                        <div>
                                            <IconBook className="text-info me-2" />
                                            <span className="text-muted small">In catalog</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Total Orders</div>
                                    </div>
                                    <div className="h1 mb-3">{stats.totalOrders.toLocaleString()}</div>
                                    <div className="d-flex mb-2">
                                        <div>
                                            <IconShoppingCart className="text-success me-2" />
                                            <span className="text-muted small">
                                                {stats.pendingOrders} pending
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Revenue */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="subheader">Total Revenue</div>
                                    </div>
                                    <div className="h1 mb-3">{formatCurrency(stats.totalRevenue)}</div>
                                    <div className="d-flex mb-2">
                                        <div>
                                            <IconCurrencyDollar className="text-warning me-2" />
                                            <span className="text-muted small">All time</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row row-deck row-cards">
                        {/* Recent Orders */}
                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Recent Orders</h3>
                                    <div className="card-actions">
                                        <Link to="/admin/orders" className="btn btn-sm btn-primary">
                                            View All
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {recentOrders.length === 0 ? (
                                        <div className="empty">
                                            <p className="empty-title">No orders yet</p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-vcenter card-table">
                                                <thead>
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Customer</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentOrders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td>
                                                                <Link to={`/admin/orders/${order.id}`}>
                                                                    #{order.id}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                                                    {order.user_name || `User #${order.user_id}`}
                                                                </div>
                                                            </td>
                                                            <td>{formatCurrency(order.total_amount)}</td>
                                                            <td>
                                                                <span className={`badge bg-${getOrderStatusBadge(order.status)}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {order.created_at
                                                                    ? new Date(order.created_at * 1000).toLocaleDateString()
                                                                    : 'N/A'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Top Selling Books */}
                        <div className="col-lg-5">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Top Selling Books</h3>
                                    <div className="card-actions">
                                        <Link to="/admin/books" className="btn btn-sm btn-primary">
                                            View All
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {(!Array.isArray(topBooks) || topBooks.length === 0) ? (
                                        <div className="empty">
                                            <p className="empty-title">No sales data yet</p>
                                        </div>
                                    ) : (
                                        <div className="list-group list-group-flush">
                                            {topBooks.map((book, index) => (
                                                <div key={book.id} className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto">
                                                            <span className="badge bg-primary">{index + 1}</span>
                                                        </div>
                                                        <div className="col text-truncate">
                                                            <Link to={`/admin/books/${book.id}`} className="text-reset d-block">
                                                                {book.title}
                                                            </Link>
                                                            <div className="text-muted small">
                                                                {book.author || 'Unknown Author'}
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="text-muted small">
                                                                {book.sold_count || 0} sold
                                                            </div>
                                                            <div className="text-success">
                                                                {formatCurrency(book.sold_count * book.price || 0)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Quick Actions</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/books/create" className="btn btn-white w-100">
                                                <IconBook className="icon mb-2" />
                                                <div>Add Book</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/users/create" className="btn btn-white w-100">
                                                <IconUsers className="icon mb-2" />
                                                <div>Add User</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/orders" className="btn btn-white w-100">
                                                <IconShoppingCart className="icon mb-2" />
                                                <div>View Orders</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/categories" className="btn btn-white w-100">
                                                <IconBook className="icon mb-2" />
                                                <div>Categories</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/settings" className="btn btn-white w-100">
                                                <IconSettings className="icon mb-2" />
                                                <div>Settings</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/posts" className="btn btn-white w-100">
                                                <IconUsers className="icon mb-2" />
                                                <div>Posts</div>
                                            </Link>
                                        </div>
                                        <div className="col-6 col-sm-4 col-md-2">
                                            <Link to="/admin/contacts" className="btn btn-white w-100">
                                                <IconMessage className="icon mb-2" />
                                                <div>Message</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboardPage;
