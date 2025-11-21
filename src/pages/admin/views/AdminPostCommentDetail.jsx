// src/pages/admin/views/AdminPostCommentDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postCommentService } from '@/services/postComment.service';
import { postService } from '@/services/post.service'; // To fetch post titles for display
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconMessage,
    IconUser,
    IconCheck,
    IconX
} from '@tabler/icons-react';
import { usersService } from '@/services/users.service';

const AdminPostCommentDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [postComment, setPostComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [commentText, setCommentText] = useState('');
    const [postTitle, setPostTitle] = useState('Loading...');
    const [userName, setUserName] = useState('Loading...');

    const fetchPostComment = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await postCommentService.getPostCommentById(id);
            if (response.success) {
                setPostComment(response.data);
                setCommentText(response.data.comment_text);

                // Fetch post title
                try {
                    const postResponse = await postService.getPostById(response.data.post_id);
                    setPostTitle(postResponse.success ? postResponse.data.title : 'Unknown Post');
                } catch (postErr) {
                    console.error("Error fetching post for comment:", postErr);
                    setPostTitle('Unknown Post');
                }

                // Fetch user name
                try {
                    const userResponse = await usersService.getUserById(response.data.user_id);
                    setUserName(userResponse.success ? userResponse.data.full_name : 'Unknown User');
                } catch (userErr) {
                    console.error("Error fetching user for comment:", userErr);
                    setUserName('Unknown User');
                }

            } else {
                throw new Error(response.message || 'Failed to fetch post comment details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching post comment details.');
            setPostComment(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPostComment();
    }, [fetchPostComment]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!postComment || !id) {
            setError('Post comment data not found.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                comment_text: commentText,
                // Add fields for moderation status if applicable
            };
            const response = await postCommentService.updatePostComment(id, updateData);
            if (response.success) {
                setSuccessMessage('Post comment updated successfully!');
                fetchPostComment(); // Refresh data
            } else {
                throw new Error(response.message || 'Failed to update post comment');
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
                <p className="empty-title">Loading post comment details...</p>
            </div>
        );
    }

    if (error && !postComment) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load post comment details. <Link to="/admin/post-comments">Go back to Comment List</Link></p>
            </div>
        );
    }

    if (!postComment) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconMessage className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Comment not found</p>
                <p className="empty-subtitle">The comment with ID "{id}" does not exist. <Link to="/admin/post-comments">Go back to Comment List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Post Comment: {postComment.id} | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Edit Post Comment: ${postComment.id}`}
                backLink="/admin/post-comments"
                backLinkText="Back to Comments"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <p><strong>Comment ID:</strong> {postComment.id}</p>
                <p><strong>Post:</strong> <Link to={`/posts/${postComment.post_id}`}>{postTitle}</Link> (<Link to={`/admin/posts/${postComment.post_id}`}>Admin Post Page</Link>)</p>
                <p><strong>User:</strong> {userName} (<Link to={`/admin/users/${postComment.user_id}`}>Admin User Page</Link>)</p>
                <p><strong>Created At:</strong> {new Date(postComment.created_at * 1000).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(postComment.updated_at * 1000).toLocaleString()}</p>

                <TextInput
                    label="Comment Text"
                    name="comment_text"
                    type="textarea"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={5}
                    placeholder="Edit comment text"
                    required
                    icon={IconMessage}
                />
            </AdminForm>
        </>
    );
};

export default AdminPostCommentDetail;
