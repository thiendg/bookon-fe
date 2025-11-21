// src/pages/home/views/PostDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '@/services/post.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconUser, IconArrowLeft } from '@tabler/icons-react'; // Added IconArrowLeft

// Import comment components
import PostCommentsList from './PostCommentsList';
import PostCommentForm from './PostCommentForm';

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentRefreshKey, setCommentRefreshKey] = useState(0); // Key to trigger comments refresh

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
        setCommentRefreshKey(prev => prev + 1); // Increment key to trigger refresh
    };

    if (loading) {
        return (
            <BasePage title="Loading Post">
                <div className="container mx-auto px-4 py-8 text-center">Loading post details...</div>
            </BasePage>
        );
    }

    if (error && !post) {
        return (
            <BasePage title="Post Error">
                <div className="container mx-auto px-4 py-8 text-center text-red-600">
                    <p className="mb-3">Error: {error}</p>
                    <Link to="/posts" className="btn btn-primary">Back to Posts</Link>
                </div>
            </BasePage>
        );
    }

    if (!post) {
        return (
            <BasePage title="Post Not Found">
                <div className="container mx-auto px-4 py-8 text-center text-red-600">
                    <p className="mb-3">Post not found.</p>
                    <Link to="/posts" className="btn btn-primary">Back to Posts</Link>
                </div>
            </BasePage>
        );
    }

    return (
        <BasePage title={post.title}>
            <Helmet>
                <meta name="description" content={post.content.substring(0, 160)} />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/posts" className="btn btn-ghost d-none d-sm-inline-block mb-4">
                    <IconArrowLeft className="icon" />
                    Back to Posts
                </Link>
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                        <p className="text-sm text-gray-600 mb-4">
                            <IconUser className="icon icon-sm me-1" /> By User {post.user_id} on {new Date(post.created_at * 1000).toLocaleDateString()}
                        </p>
                        <div className="text-lg leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                </div>

                {/* Post Comments Section */}
                <div className="card mt-6">
                    <div className="card-header">
                        <h3 className="card-title">Comments</h3>
                    </div>
                    <PostCommentsList postId={post.id} onCommentAdded={handleCommentAdded} key={commentRefreshKey} />
                    <PostCommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
                </div>
            </div>
        </BasePage>
    );
};

export default PostDetailPage;
