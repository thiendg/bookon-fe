// src/pages/admin/views/BookList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { bookService } from '@/services/book.service';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconTrash,
    IconPlus,
    IconBook
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

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // Add totalItems state
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                pageSize: pageSize,
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await bookService.getBooks(params);
            if (response.success) {
                setBooks(response.data.data || []); // Correctly extract books
                setTotalPages(response.data.pagination.totalPages || 1);
                setTotalItems(response.data.pagination.totalItems || 0); // Set totalItems
            } else {
                throw new Error(response.message || 'Failed to fetch books');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching books.');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, debouncedSearchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

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

    const handleDelete = async (bookId) => {
        if (!window.confirm("Are you sure you want to delete this book?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await bookService.deleteBook(bookId);
            if (response.success) {
                fetchBooks(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete book');
            }
        } catch (err) {
            setError(err.message || 'Error deleting book.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Book Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">Book Management</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <Link to="/admin/books/create" className="btn btn-primary d-none d-sm-inline-block">
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
                            <h3 className="card-title">All Books</h3>
                            <div className="card-actions">
                                <div className="input-icon">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        placeholder="Search books..."
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
                                        <IconBook className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading books...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the book data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconBook className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load book data.</p>
                                </div>
                            ) : books.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconBook className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No books found</p>
                                    <p className="empty-subtitle">Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map(book => (
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>{book.category_name}</td>
                                                <td>${parseFloat(book.price).toFixed(2)}</td>
                                                <td>{book.stock_quantity}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/books/${book.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="Edit">
                                                            <IconEdit />
                                                        </Link>
                                                        <button onClick={() => handleDelete(book.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
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

export default BookList;
