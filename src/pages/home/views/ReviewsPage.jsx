// src/pages/home/views/ReviewsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { reviewService } from '@/services/review.service';
import { bookService } from '@/services/book.service'; // To fetch book titles for reviews
import { useAuth } from '@/hooks/useAuth.hook';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { IconStar, IconMessage, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

const ReviewsPage = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // State for new review form
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newReviewData, setNewReviewData] = useState({
        book_id: '',
        rating: 5,
        comment: ''
    });
    const [booksList, setBooksList] = useState([]); // For book selection dropdown
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewFormError, setReviewFormError] = useState('');
    const [reviewFormSuccess, setReviewFormSuccess] = useState('');

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError('');
        if (!user || !user.id) {
            setError('User not authenticated.');
            setLoading(false);
            return;
        }
        try {
            const response = await reviewService.getReviews({
                page: currentPage,
                limit: limit,
                user_id: user.id // Filter reviews by authenticated user's ID
            });
            if (response.success) {
                // For each review, fetch book title (can optimize with a combined API endpoint later)
                const reviewsWithBookTitles = await Promise.all(
                    (response.data.data || []).map(async (review) => { // Correctly extract reviews from response.data.data
                        try {
                            const bookResponse = await bookService.getBookById(review.book_id);
                            return { ...review, book_title: bookResponse.success ? bookResponse.data.title : 'Unknown Book' };
                        } catch (bookErr) {
                            console.error("Error fetching book for review:", bookErr);
                            return { ...review, book_title: 'Unknown Book' };
                        }
                    })
                );
                setReviews(reviewsWithBookTitles);
                setTotalPages(response.data.pagination.totalPages || 1); // Extract totalPages from pagination object
                setTotalItems(response.data.pagination.totalItems || 0); // Set totalItems
            } else {
                throw new Error(response.message || 'Failed to fetch reviews');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching reviews.');
            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, [user, currentPage, limit]);

    const fetchBooksForDropdown = useCallback(async () => {
        try {
            const response = await bookService.getBooks({ limit: 100 }); // Get a reasonable number of books
            if (response.success) {
                setBooksList(response.data.data || []); // Correctly extract books from response.data.data
            }
        } catch (err) {
            console.error("Failed to fetch books for review dropdown:", err);
            setBooksList([]);
        }
    }, []);

    useEffect(() => {
        fetchReviews();
        fetchBooksForDropdown();
    }, [fetchReviews, fetchBooksForDropdown]);

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

    const handleNewReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReviewData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        setReviewFormError('');
        setReviewFormSuccess('');

        if (!user || !user.id) {
            setReviewFormError('User not authenticated.');
            setSubmittingReview(false);
            return;
        }

        const reviewToCreate = {
            book_id: newReviewData.book_id,
            user_id: user.id,
            rating: parseInt(newReviewData.rating),
            comment: newReviewData.comment,
        };

        try {
            const response = await reviewService.createReview(reviewToCreate);
            if (response.success) {
                setReviewFormSuccess('Review submitted successfully!');
                setNewReviewData({ book_id: '', rating: 5, comment: '' }); // Clear form
                setShowCreateForm(false); // Hide form
                fetchReviews(); // Refresh list
            } else {
                throw new Error(response.message || 'Failed to submit review');
            }
        } catch (err) {
            setReviewFormError(err.message || 'An error occurred while submitting review.');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }
        setLoading(true); // Re-use main loading state for simplicity
        try {
            const response = await reviewService.deleteReview(reviewId);
            if (response.success) {
                fetchReviews(); // Refresh list
            } else {
                throw new Error(response.message || 'Failed to delete review');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while deleting review.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <BasePage title="My Reviews">
            <Helmet>
                <meta name="description" content="View and manage your book reviews on BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">My Reviews</h1>
                    <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
                        <IconPlus className="icon" />
                        {showCreateForm ? 'Cancel Review' : 'Write a Review'}
                    </button>
                </div>

                {showCreateForm && (
                    <div className="card mb-4">
                        <div className="card-header">
                            <h3 className="card-title">Write a New Review</h3>
                        </div>
                        <div className="card-body">
                            {reviewFormSuccess && (
                                <div className="alert alert-success" role="alert">{reviewFormSuccess}</div>
                            )}
                            {reviewFormError && (
                                <div className="alert alert-danger" role="alert">{reviewFormError}</div>
                            )}
                            <form onSubmit={handleNewReviewSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Book</label>
                                    <select
                                        className="form-select"
                                        name="book_id"
                                        value={newReviewData.book_id}
                                        onChange={handleNewReviewChange}
                                        required
                                        disabled={booksList.length === 0}
                                    >
                                        <option value="">Select a book...</option>
                                        {booksList.map(book => (
                                            <option key={book.id} value={book.id}>{book.title}</option>
                                        ))}
                                    </select>
                                    {booksList.length === 0 && <small className="form-text text-muted">No books available to review. </small>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rating</label>
                                    <select
                                        className="form-select"
                                        name="rating"
                                        value={newReviewData.rating}
                                        onChange={handleNewReviewChange}
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
                                        rows="3"
                                        value={newReviewData.comment}
                                        onChange={handleNewReviewChange}
                                        placeholder="Share your thoughts about the book..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading your reviews...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="row row-cards">
                        {reviews.map(review => (
                            <div className="col-md-6 col-lg-4" key={review.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="avatar avatar-md me-3 rounded-circle" style={{ backgroundImage: `url(${user?.avatar_url || '/user-avatar.png'})` }}></div>
                                            <div>
                                                <h4 className="card-title m-0">{user?.full_name}</h4>
                                                <small className="text-muted">Reviewed <Link to={`/books/${review.book_id}`}>{review.book_title}</Link></small>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <IconStar key={i} className={`icon ${i < review.rating ? 'text-yellow' : 'text-gray-300'}`} />
                                            ))}
                                            <div className="ms-2 text-muted">{review.rating} Stars</div>
                                        </div>
                                        <p className="text-muted">{review.comment}</p>
                                        <small className="text-muted">On {new Date(review.created_at * 1000).toLocaleDateString()}</small>
                                        <div className="mt-3 d-flex justify-content-end">
                                            {/* Link to edit review (if applicable) */}
                                            {/* <button className="btn btn-sm btn-icon btn-outline-primary me-2"><IconEdit /></button> */}
                                            <button className="btn btn-sm btn-icon btn-outline-danger" onClick={() => handleDeleteReview(review.id)}><IconTrash /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty-img">
                            <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                        </div>
                        <p className="empty-title">You haven't written any reviews yet!</p>
                        <p className="empty-subtitle">Share your thoughts on the books you've read.</p>
                        <div className="empty-action">
                            <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
                                Write your first review
                            </button>
                        </div>
                    </div>
                )}

                {reviews.length > 0 && (
                    <div className="card-footer d-flex align-items-center mt-4">
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
                )}
            </div>
        </BasePage>
    );
};

export default ReviewsPage;
