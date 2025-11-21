// src/pages/admin/views/AdminReviewDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { reviewService } from '@/services/review.service';
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconMessage,
    IconStar,
    IconUser,
    IconBook
} from '@tabler/icons-react';

const AdminReviewDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const fetchReview = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await reviewService.getReviewById(id);
            if (response.success) {
                setReview(response.data);
                setComment(response.data.comment);
                setRating(response.data.rating);
            } else {
                throw new Error(response.message || 'Failed to fetch review details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching review details.');
            setReview(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchReview();
    }, [fetchReview]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!review || !id) {
            setError('Review data not found.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                comment: comment,
                rating: parseInt(rating),
                // Add fields for moderation status if applicable
            };
            const response = await reviewService.updateReview(id, updateData);
            if (response.success) {
                setSuccessMessage('Review updated successfully!');
                fetchReview(); // Refresh data
            } else {
                throw new Error(response.message || 'Failed to update review');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during update.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading review details...</p>
            </div>
        );
    }

    if (error && !review) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load review details. <Link to="/admin/reviews">Go back to Review List</Link></p>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Review not found</p>
                <p className="empty-subtitle">The review with ID "{id}" does not exist. <Link to="/admin/reviews">Go back to Review List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Review: {review.id} | Admin - BookOn</title>
            </Helmet>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <Link to="/admin/reviews" className="btn btn-ghost d-none d-sm-inline-block">
                                <IconArrowLeft className="icon" />
                                Back to Reviews
                            </Link>
                            <h2 className="page-title">Edit Review # {review.id}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <form className="card" onSubmit={handleUpdate}>
                        <div className="card-header">
                            <h3 className="card-title">Review Details</h3>
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
                            <p><strong>Review ID:</strong> {review.id}</p>
                            <p><strong>Book ID:</strong> {review.book_id} (<Link to={`/books/${review.book_id}`}>View Book</Link>)</p>
                            <p><strong>User ID:</strong> {review.user_id}</p> {/* Link to user detail? */}
                            <p><strong>Created At:</strong> {new Date(review.created_at * 1000).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(review.updated_at * 1000).toLocaleString()}</p>

                            <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <select
                                    className="form-select"
                                    name="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                >
                                    {[5, 4, 3, 2, 1].map(r => (
                                        <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comment</label>
                                <textarea
                                    className="form-control"
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows="5"
                                    placeholder="Edit review comment"
                                    required
                                ></textarea>
                            </div>
                            {/* Add a moderation status field if the backend supports it */}
                        </div>
                        <div className="card-footer text-end">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminReviewDetail;
