// src/pages/admin/views/AdminCategoryList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/category.service';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconTrash,
    IconPlus,
    IconCategory
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

const AdminCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10); // Backend uses 'limit' not 'pageSize' for categories
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                limit: limit, // Use 'limit'
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await categoryService.getCategories(params);
            if (response.success) {
                setCategories(response.data.categories || []); // Backend returns 'categories' directly
                setTotalPages(Math.ceil(response.data.total / limit) || 1); // Extract from 'total'
                setTotalItems(response.data.total || 0);
            } else {
                throw new Error(response.message || 'Failed to fetch categories');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching categories.');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, debouncedSearchTerm]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

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

    const handleDelete = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await categoryService.deleteCategory(categoryId);
            if (response.success) {
                fetchCategories(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete category');
            }
        } catch (err) {
            setError(err.message || 'Error deleting category.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Category Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">Category Management</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <Link to="/admin/categories/create" className="btn btn-primary d-none d-sm-inline-block">
                                    <IconPlus className="icon" />
                                    New Category
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Categories</h3>
                            <div className="card-actions">
                                <div className="input-icon">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        placeholder="Search categories..."
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
                                        <IconCategory className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading categories...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the category data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconCategory className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load category data.</p>
                                </div>
                            ) : categories.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconCategory className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No categories found</p>
                                    <p className="empty-subtitle">Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>{category.slug}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/categories/${category.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="Edit">
                                                            <IconEdit />
                                                        </Link>
                                                        <button onClick={() => handleDelete(category.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
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

export default AdminCategoryList;
