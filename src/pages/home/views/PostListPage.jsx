// src/pages/home/views/PostListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { postService } from '@/services/post.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, NewspaperIcon } from '@heroicons/react/24/outline';

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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <BasePage title="News & Articles" currentPage="posts">
            <Helmet>
                <meta name="description" content="Read the latest news and articles from BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Latest News & Articles</h1>
                    <p className="mt-2 text-base text-gray-600">Stay updated with the latest from the world of books.</p>
                </div>

                <div className="mb-8 max-w-lg mx-auto">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Search articles..."
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading Posts...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Error Fetching Posts</h3>
                        <p>{error}</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map(post => (
                            <Link key={post.id} to={`/posts/${post.id}`} className="block bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 no-underline">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        {post.thumbnail ? (
                                            <img src={`${import.meta.env.VITE_API_URL}${post.thumbnail}`} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400"><NewspaperIcon className="h-10 w-10"/></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                                        <p className="text-gray-600 text-sm line-clamp-3">{(post.content || '').replace(/<[^>]+>/g, ' ')}</p>
                                        <div className="text-xs text-gray-500 mt-2">By {post.author_name || 'Admin'} • {post.created_at ? new Date(post.created_at * 1000).toLocaleDateString() : 'N/A'}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <NewspaperIcon className="h-12 w-12 mx-auto text-gray-400"/>
                        <h3 className="mt-4 font-semibold text-gray-800">No Posts Found</h3>
                        <p className="text-gray-500">No articles match your search criteria. Please try again later.</p>
                    </div>
                )}

                {totalItems > 0 && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm">
                        <p className="text-gray-600 mb-2 sm:mb-0">
                            Showing <span>{(currentPage - 1) * limit + 1}</span> to <span>{Math.min(currentPage * limit, totalItems)}</span> of <span>{totalItems}</span> results
                        </p>
                        <div className="flex">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 flex items-center border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50">
                                <ChevronLeftIcon className="h-4 w-4"/>
                                <span className="ml-1 hidden sm:inline">Previous</span>
                            </button>
                            <span className="px-3 py-1 border-t border-b border-gray-300 bg-white text-indigo-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 flex items-center border border-gray-300 rounded-r-md bg-white hover:bg-gray-50 disabled:opacity-50">
                                <span className="mr-1 hidden sm:inline">Next</span>
                                <ChevronRightIcon className="h-4 w-4"/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default PostListPage;
