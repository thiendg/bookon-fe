// src/pages/admin/views/TransactionsList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { transactionService } from '@/services/transaction.service';
import { Helmet } from 'react-helmet-async';
import {
    IconCoin,
    IconSearch,
    IconFilter,
    IconCircleCheck,
    IconCircleX,
    IconClock,
    IconRefresh,
} from '@tabler/icons-react';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 20,
    });

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: pagination.currentPage,
                limit: pagination.itemsPerPage,
                search: searchTerm,
                status: statusFilter,
            };
            const response = await transactionService.getTransactions(params);
            if (response.success) {
                setTransactions(response.data || []);
                if (response.pagination) {
                    setPagination(response.pagination);
                }
            } else {
                throw new Error(response.message || 'Failed to fetch transactions');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching transactions.');
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, [pagination.currentPage, pagination.itemsPerPage, searchTerm, statusFilter]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        fetchTransactions();
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: { color: 'warning', icon: IconClock, label: 'Pending' },
            completed: { color: 'success', icon: IconCircleCheck, label: 'Completed' },
            failed: { color: 'danger', icon: IconCircleX, label: 'Failed' },
            refunded: { color: 'info', icon: IconRefresh, label: 'Refunded' },
        };

        const statusInfo = statusMap[status?.toLowerCase()] || statusMap.pending;
        const Icon = statusInfo.icon;

        return (
            <span className={`badge bg-${statusInfo.color}`}>
                <Icon className="icon icon-sm me-1" />
                {statusInfo.label}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount || 0);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp * 1000).toLocaleString('vi-VN');
    };

    return (
        <>
            <Helmet>
                <title>Transactions Management | Admin - BookOn</title>
            </Helmet>

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">Transactions</h2>
                            <div className="text-muted mt-1">
                                Total: {pagination.totalItems} transactions
                            </div>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <button onClick={fetchTransactions} className="btn btn-icon btn-white">
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
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError('')}
                            ></button>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-header">
                            <form onSubmit={handleSearch} className="row g-2 w-100">
                                <div className="col-auto flex-grow-1">
                                    <div className="input-icon">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by transaction ID, order ID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <span className="input-icon-addon">
                                            <IconSearch className="icon" />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <select
                                        className="form-select"
                                        value={statusFilter}
                                        onChange={(e) => {
                                            setStatusFilter(e.target.value);
                                            setPagination((prev) => ({ ...prev, currentPage: 1 }));
                                        }}
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="failed">Failed</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">
                                        <IconFilter className="icon" /> Filter
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconCoin style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No transactions found</p>
                                    <p className="empty-subtitle text-muted">
                                        {searchTerm || statusFilter
                                            ? 'Try adjusting your filters.'
                                            : 'Transactions will appear here once orders are processed.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-vcenter card-table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Order</th>
                                                <th>Amount</th>
                                                <th>Payment Method</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Reference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((transaction) => (
                                                <tr key={transaction.id}>
                                                    <td>
                                                        <span className="text-muted">#{transaction.id}</span>
                                                    </td>
                                                    <td>
                                                        {transaction.order_id ? (
                                                            <Link
                                                                to={`/admin/orders/${transaction.order_id}`}
                                                                className="text-reset"
                                                            >
                                                                Order #{transaction.order_id}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-muted">N/A</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <strong className="text-success">
                                                            {formatCurrency(transaction.amount)}
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-azure-lt">
                                                            {transaction.payment_method || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td>{getStatusBadge(transaction.status)}</td>
                                                    <td>
                                                        <div>{formatDate(transaction.transaction_date)}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-muted small text-truncate" style={{ maxWidth: '150px' }}>
                                                            {transaction.transaction_reference || 'N/A'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        {transactions.length > 0 && pagination.totalPages > 1 && (
                            <div className="card-footer d-flex align-items-center">
                                <p className="m-0 text-muted">
                                    Showing{' '}
                                    {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
                                    {Math.min(
                                        pagination.currentPage * pagination.itemsPerPage,
                                        pagination.totalItems
                                    )}{' '}
                                    of {pagination.totalItems} entries
                                </p>
                                <ul className="pagination m-0 ms-auto">
                                    <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setPagination((prev) => ({
                                                    ...prev,
                                                    currentPage: prev.currentPage - 1,
                                                }))
                                            }
                                            disabled={pagination.currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(pagination.totalPages)].map((_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${
                                                pagination.currentPage === index + 1 ? 'active' : ''
                                            }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setPagination((prev) => ({
                                                        ...prev,
                                                        currentPage: index + 1,
                                                    }))
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li
                                        className={`page-item ${
                                            pagination.currentPage === pagination.totalPages ? 'disabled' : ''
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setPagination((prev) => ({
                                                    ...prev,
                                                    currentPage: prev.currentPage + 1,
                                                }))
                                            }
                                            disabled={pagination.currentPage === pagination.totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionsList;
