// src/pages/admin/views/UserList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { usersService } from '@/services/users.service';
import { Helmet } from 'react-helmet-async';
import { IconSearch, IconChevronLeft, IconChevronRight, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                pageSize: pageSize,
                // Assuming backend supports searching by 'search' param for users
                // If not, this needs adjustment
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await usersService.getUsers(params);
            if (response.success) {
                setUsers(response.data.data || []); // Correctly extract users
                setTotalPages(response.data.pagination.totalPages || 1);
                setTotalItems(response.data.pagination.totalItems || 0); // Set totalItems
            } else {
                throw new Error(response.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching users.');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, debouncedSearchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this User?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await usersService.deleteUser(userId);
            if (response.success) {
                fetchUsers(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete User');
            }
        } catch (err) {
            setError(err.message || 'Error deleting User.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Helmet>
                <title>User Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">User Management</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <Link to="/admin/users/create" className="btn btn-primary d-none d-sm-inline-block">
                                    <IconPlus className="icon" />
                                    New Book
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Users</h3>
                            <div className="card-actions">
                                <div className="input-icon">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        placeholder="Search users..."
                                    />
                                    <span className="input-icon-addon">
                                        <IconSearch />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            {loading ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconSearch className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading users...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the user data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconSearch className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load user data.</p>
                                </div>
                            ) : users.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconSearch className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No users found</p>
                                    <p className="empty-subtitle">Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.full_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role_name}</td>
                                                <td>
                                                    <span className={`badge bg-${user.status === 'active' ? 'success' : 'danger'}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/users/${user.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="Edit">
                                                            <IconEdit />
                                                        </Link>
                                                        <button onClick={() => handleDelete(user.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
                                                            <IconTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="card-footer d-flex align-items-center">
                            <p className="m-0 text-muted">Showing <span>{(currentPage - 1) * pageSize + 1}</span> to <span>{Math.min(currentPage * pageSize, totalItems)}</span> of <span>{totalItems}</span> entries</p>
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
            </div >
        </>
    );
};

export default UserList;
