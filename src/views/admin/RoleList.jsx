// src/pages/admin/views/RoleList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { roleService } from '@/services/role.service';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconTrash,
    IconPlus,
    IconUserShield
} from '@tabler/icons-react';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchRoles = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await roleService.getRoles({
                page: currentPage,
                pageSize: pageSize,
            });
            if (response.success) {
                setRoles(response.data.data || []);
                setTotalPages(Math.ceil(response.data.total / pageSize) || 1); // Backend provides 'total', not 'pagination.totalPages'
                setTotalItems(response.data.total || 0);
            } else {
                throw new Error(response.message || 'Failed to fetch roles');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching roles.');
            setRoles([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

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

    const handleDelete = async (roleId) => {
        if (!window.confirm("Are you sure you want to delete this role?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await roleService.deleteRole(roleId);
            if (response.success) {
                fetchRoles(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete role');
            }
        } catch (err) {
            setError(err.message || 'Error deleting role.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Role Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">Role Management</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <Link to="/admin/roles/create" className="btn btn-primary d-none d-sm-inline-block">
                                    <IconPlus className="icon" />
                                    New Role
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Roles</h3>
                            {/* Search is not implemented in backend for roles yet, so omitting for now */}
                        </div>
                        <div className="table-responsive">
                            {loading ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconUserShield className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading roles...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the role data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconUserShield className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load role data.</p>
                                </div>
                            ) : roles.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconUserShield className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No roles found</p>
                                    <p className="empty-subtitle">Create new roles to manage user access.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Permissions</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.map(role => (
                                            <tr key={role.id}>
                                                <td>{role.id}</td>
                                                <td>{role.name}</td>
                                                <td>
                                                    {role.permissions ? (
                                                        <ul className="list-unstyled mb-0">
                                                            {Object.entries(role.permissions).map(([module, perms]) => (
                                                                <li key={module}><strong>{module}:</strong> {perms.join(', ')}</li>
                                                            ))}
                                                        </ul>
                                                    ) : 'No permissions defined'}
                                                </td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/roles/${role.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="Edit">
                                                            <IconEdit />
                                                        </Link>
                                                        <button onClick={() => handleDelete(role.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
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
            </div>
        </>
    );
};

export default RoleList;
