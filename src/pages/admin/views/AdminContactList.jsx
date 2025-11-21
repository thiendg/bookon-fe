// src/pages/admin/views/AdminContactList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { contactService } from '@/services/contact.service';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconEye, // For view/detail
    IconTrash,
    IconMailOpened, // For contact status
    IconMail
} from '@tabler/icons-react';

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

const AdminContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // Assuming search by name or email
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                limit: limit,
                // Backend supports filtering by status. Generic search by name/email might need backend update
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await contactService.getContacts(params);
            if (response.success) {
                // Backend returns 'contacts', 'total', 'page', 'limit'
                setContacts(response.data.contacts || []);
                setTotalPages(Math.ceil(response.data.total / limit) || 1);
                setTotalItems(response.data.total || 0);
            } else {
                throw new Error(response.message || 'Failed to fetch contacts');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching contacts.');
            setContacts([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, debouncedSearchTerm]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

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

    const handleDelete = async (contactId) => {
        if (!window.confirm("Are you sure you want to delete this contact message?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await contactService.deleteContact(contactId);
            if (response.success) {
                fetchContacts(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete contact');
            }
        } catch (err) {
            setError(err.message || 'Error deleting contact.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">Contact Management</h2>
                        </div>
                        {/* No create button, contacts are created via public form */}
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Contact Messages</h3>
                            <div className="card-actions">
                                <div className="input-icon">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        placeholder="Search by name or email..."
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
                                        <IconMail className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading contacts...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the contact data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconMail className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load contact data.</p>
                                </div>
                            ) : contacts.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconMail className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No contact messages found</p>
                                    <p className="empty-subtitle">Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Message Excerpt</th>
                                            <th>Status</th>
                                            <th>Received At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map(contact => (
                                            <tr key={contact.id}>
                                                <td>{contact.id}</td>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td className="text-truncate" style={{ maxWidth: '200px' }}>{contact.message}</td>
                                                <td>
                                                    <span className={`badge bg-${
                                                        contact.status === 'read' ? 'success' :
                                                        contact.status === 'responded' ? 'info' :
                                                        'warning'
                                                    }`}>
                                                        {contact.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(contact.created_at * 1000).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/contacts/${contact.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="View/Edit">
                                                            <IconEye />
                                                        </Link>
                                                        <button onClick={() => handleDelete(contact.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
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
            </div>
        </>
    );
};

export default AdminContactList;
