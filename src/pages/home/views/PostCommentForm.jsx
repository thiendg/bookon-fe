// src/pages/home/views/PostCommentForm.jsx
import React, { useState } from 'react';
import { postCommentService } from '@/services/postComment.service';
import { useAuth } from '@/hooks/useAuth.hook';
import { IconSend } from '@tabler/icons-react';

const PostCommentForm = ({ postId, onCommentAdded }) => {
    const { user, isAuthenticated } = useAuth();
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSubmitting(true);

        if (!isAuthenticated || !user || !user.id) {
            setError('You must be logged in to post a comment.');
            setSubmitting(false);
            return;
        }

        if (!commentText.trim()) {
            setError('Comment cannot be empty.');
            setSubmitting(false);
            return;
        }

        try {
            const commentData = {
                post_id: postId,
                user_id: user.id,
                comment_text: commentText,
            };
            const response = await postCommentService.createPostComment(commentData);
            if (response.success) {
                setSuccess('Comment posted successfully!');
                setCommentText('');
                if (onCommentAdded) {
                    onCommentAdded(); // Notify parent to refresh comments list
                }
            } else {
                throw new Error(response.message || 'Failed to post comment');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while posting comment.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="card-body">
                <div className="alert alert-info text-center">
                    Please <Link to="/login">log in</Link> to post a comment.
                </div>
            </div>
        );
    }

    return (
        <div className="card-body">
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Your Comment</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                        disabled={submitting}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Posting...' : 'Post Comment'}
                        <IconSend className="icon ms-2" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostCommentForm;
