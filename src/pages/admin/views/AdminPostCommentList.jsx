// src/pages/admin/views/AdminPostCommentList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { postCommentService } from '@/services/postComment.service';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconTrash,
    IconMessage,
    IconEye
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

const AdminPostCommentList = () => {
    const [postComments, setPostComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // Assuming search by comment text or user email
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchPostComments = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                limit: limit,
                // Backend supports filtering by post_id, user_id.
                // For a generic search, we might need a backend update or filter on frontend
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await postCommentService.getPostComments(params);
            if (response.success) {
                // Backend returns 'post_comments', 'total', 'page', 'limit'
                setPostComments(response.data.post_comments || []);
                setTotalPages(Math.ceil(response.data.total / limit) || 1);
                setTotalItems(response.data.total || 0);
            } else {
                throw new Error(response.message || 'Failed to fetch post comments');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching post comments.');
            setPostComments([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, debouncedSearchTerm]);

    useEffect(() => {
        fetchPostComments();
    }, [fetchPostComments]);

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

    const handleDelete = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        try {
            setLoading(true);
            const response = await postCommentService.deletePostComment(commentId);
            if (response.success) {
                fetchPostComments(); // Refresh the list
            } else {
                throw new Error(response.message || 'Failed to delete comment');
            }
        } catch (err) {
            setError(err.message || 'Error deleting comment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Post Comment Management | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">Post Comment Management</h2>
                        </div>
                        {/* No create button, comments are created on post detail page by users */}
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Post Comments</h3>
                            <div className="card-actions">
                                <div className="input-icon">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                        placeholder="Search comments..."
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
                                        <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">Loading comments...</p>
                                    <p className="empty-subtitle">Please wait while we fetch the comment data.</p>
                                </div>
                            ) : error ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconMessage className="icon" style={{ width: '4rem', height: '4rem', color: 'red' }} />
                                    </div>
                                    <p className="empty-title text-danger">Error: {error}</p>
                                    <p className="empty-subtitle">Could not load comment data.</p>
                                </div>
                            ) : postComments.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No comments found</p>
                                    <p className="empty-subtitle">Try adjusting your search or filters.</p>
                                </div>
                            ) : (
                                <table className="table table-vcenter card-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Post ID</th>
                                            <th>User ID</th>
                                            <th>Comment</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postComments.map(comment => (
                                            <tr key={comment.id}>
                                                <td>{comment.id}</td>
                                                <td>{comment.post_id}</td>
                                                <td>{comment.user_id}</td>
                                                <td className="text-truncate" style={{ maxWidth: '200px' }}>{comment.comment_text}</td>
                                                <td>{new Date(comment.created_at * 1000).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link to={`/admin/post-comments/${comment.id}`} className="btn btn-icon btn-sm btn-outline-primary" aria-label="View/Edit">
                                                            <IconEye />
                                                        </Link>
                                                        <button onClick={() => handleDelete(comment.id)} className="btn btn-icon btn-sm btn-outline-danger" aria-label="Delete">
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

export default AdminPostCommentList;
