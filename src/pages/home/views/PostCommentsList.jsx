// src/pages/home/views/PostCommentsList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { postCommentService } from '@/services/postComment.service';
import { usersService } from '@/services/users.service'; // To fetch user names
import { IconUser, IconClock, IconStar } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns'; // You might need to install date-fns: npm install date-fns

const PostCommentsList = ({ postId, onCommentAdded }) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentUsers, setCommentUsers] = useState({}); // Cache for comment authors

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await postCommentService.getPostComments({ post_id: postId, limit: 100 }); // Fetch all or a large number
            if (response.success) {
                setComments(response.data.post_comments || []);

                // Fetch user data for each comment
                const userIds = [...new Set((response.data.post_comments || []).map(comment => comment.user_id))];
                const usersData = {};
                await Promise.all(userIds.map(async (userId) => {
                    try {
                        const userResponse = await usersService.getUserById(userId);
                        if (userResponse.success) {
                            usersData[userId] = userResponse.data;
                        }
                    } catch (userErr) {
                        console.error("Error fetching user for comment:", userId, userErr);
                    }
                }));
                setCommentUsers(usersData);

            } else {
                throw new Error(response.message || 'Failed to fetch comments');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching comments.');
            setComments([]);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments, onCommentAdded]); // Refetch when a new comment is added

    if (loading) {
        return <div className="text-center py-4">Loading comments...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (comments.length === 0) {
        return <div className="empty">No comments yet. Be the first to comment!</div>;
    }

    return (
        <div className="space-y-4">
            {comments.map(comment => {
                const author = commentUsers[comment.user_id];
                return (
                    <div key={comment.id} className="d-flex border-bottom pb-3">
                        <div className="avatar avatar-md me-3 rounded-circle" style={{ backgroundImage: `url(${author?.avatar_url || '/user-avatar.png'})` }}></div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="m-0">{author?.full_name || 'Unknown User'}</h4>
                                <small className="text-muted">
                                    <IconClock className="icon icon-sm" /> {formatDistanceToNow(new Date(comment.created_at * 1000), { addSuffix: true })}
                                </small>
                            </div>
                            <p className="text-muted">{comment.comment_text}</p>
                            {/* Actions for comment owner/admin could go here */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PostCommentsList;
