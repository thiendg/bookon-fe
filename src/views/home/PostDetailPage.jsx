// src/pages/home/views/PostDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '@/services/post.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { UserIcon, ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Import comment components
import PostCommentsList from './PostCommentsList';
import PostCommentForm from './PostCommentForm';

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentRefreshKey, setCommentRefreshKey] = useState(0);

    const fetchPostDetails = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await postService.getPostById(id);
            if (response.success) {
                setPost(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch post details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching post details.');
            setPost(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPostDetails();
    }, [fetchPostDetails]);

    const handleCommentAdded = () => {
        setCommentRefreshKey(prev => prev + 1);
    };

    if (loading) {
        return (
            <BasePage title="Loading Post...">
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading post details...</p>
                </div>
            </BasePage>
        );
    }

    if (error && !post) {
        return (
            <BasePage title="Error">
                <div className="container mx-auto px-4 py-8 text-center text-red-600 bg-red-50 rounded-lg">
                    <p className="mb-3 font-semibold">Error: {error}</p>
                    <Link to="/posts" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Back to Posts</Link>
                </div>
            </BasePage>
        );
    }

    if (!post) {
        return (
            <BasePage title="Post Not Found">
                <div className="container mx-auto px-4 py-8 text-center text-gray-600 bg-gray-50 rounded-lg">
                    <p className="mb-3 font-semibold">Post not found.</p>
                    <Link to="/posts" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Back to Posts</Link>
                </div>
            </BasePage>
        );
    }

    return (
        <BasePage title={post.title} currentPage="posts">
            <Helmet>
                <meta name="description" content={post.content ? post.content.substring(0, 160) : ''} />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <Link to="/posts" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to all posts
                    </Link>
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-1.5">
                                <UserIcon className="h-4 w-4" />
                                <span>By {post.author_name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{new Date(post.created_at * 1000).toLocaleDateString()}</span>
                            </div>
                        </div>
                        {post.thumbnail && <img src={`${import.meta.env.VITE_API_URL}${post.thumbnail}`} alt={post.title} className="w-full h-auto rounded-lg mb-6"/>}
                        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>

                    <div className="bg-white mt-8 p-6 sm:p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-6">Comments</h3>
                        <PostCommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
                        <PostCommentsList postId={post.id} key={commentRefreshKey} />
                    </div>
                </div>
            </div>
        </BasePage>
    );
};

export default PostDetailPage;
