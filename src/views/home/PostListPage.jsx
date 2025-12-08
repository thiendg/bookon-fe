// src/pages/home/views/PostListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { postService } from '@/services/post.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { IconSearch, IconChevronLeft, IconChevronRight, IconNews } from '@tabler/icons-react';

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

const PostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                limit: limit,
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await postService.getPosts(params);
            if (response.success) {
                // Backend returns 'posts', 'total', 'page', 'limit'
                setPosts(response.data.posts || []);
                setTotalPages(Math.ceil(response.data.total / limit) || 1);
                setTotalItems(response.data.total || 0);
            } else {
                throw new Error(response.message || 'Failed to fetch posts');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching posts.');
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, debouncedSearchTerm]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

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

    return (
        <BasePage title="News & Articles">
            <Helmet>
                <meta name="description" content="Read the latest news and articles from BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Latest News & Articles</h1>

                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search posts..."
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading posts...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Error</h3>
                        <p>{error}</p>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map(post => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.id}`}
                                className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                    {post.thumbnail_image_url ? (
                                        <img src={`${import.meta.env.VITE_API_URL}/${post.thumbnail_image_url}`} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{post.title}</h2>
                                    <p className="text-gray-600 mb-2 text-sm">{(post.content || '').length > 220 ? `${(post.content || '').slice(0, 220).replace(/\n/g, ' ')}...` : (post.content || '')}</p>
                                    <div className="text-sm text-gray-500">By User {post.user_id} • {post.created_at ? new Date(post.created_at * 1000).toLocaleDateString() : 'N/A'}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty-img">
                            <IconNews className="icon" style={{ width: '4rem', height: '4rem' }} />
                        </div>
                        <p className="empty-title">No posts found</p>
                        <p className="empty-subtitle">No articles match your criteria.</p>
                        <div className="empty-action">
                            <Link to="/" className="btn btn-primary">
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                )}

                {totalItems > 0 && (
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

export default PostListPage;