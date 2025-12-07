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
            if (response && response.success) {
                const fetchedComments = response.data.posts || [];
                setComments(fetchedComments);
                // Fetch user data for each comment (unique, non-empty ids)
                const userIds = [...new Set(fetchedComments.map(comment => comment.user_id).filter(Boolean))];
                const usersData = {};
                if (userIds.length > 0) {
                    await Promise.all(userIds.map(async (userId) => {
                        try {
                            const userResponse = await usersService.getUserById(userId);
                            if (userResponse && userResponse.success) {
                                usersData[userId] = userResponse.data;
                            }
                        } catch (userErr) {
                            console.error("Error fetching user for comment:", userId, userErr);
                        }
                    }));
                }
                setCommentUsers(usersData);
            } else {
                throw new Error(response?.message || 'Failed to fetch comments');
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
    }, [fetchComments, onCommentAdded]);

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
                const timeText = comment?.created_at ? formatDistanceToNow(new Date(comment.created_at * 1000), { addSuffix: true }) : '';
                return (
                    // wrapper smaller than parent card
                    <div key={comment.id} className="p-3 bg-white rounded-md shadow-sm">
                        <div className="flex items-start">
                            <div
                                className="w-12 h-12 rounded-full bg-center bg-cover mr-3 flex-shrink-0"
                                style={{ backgroundImage: `url(${author?.avatar_url ? `${import.meta.env.VITE_API_URL}/${author?.avatar_url}` : '/user-avatar.png'})` }}
                                aria-hidden="true"
                            />

                            <div className="flex-1 min-w-0 overflow-hidden max-w-full">
                                <div className="flex items-start justify-between">
                                    <h4 className="m-0 text-sm font-semibold truncate">{author?.full_name || 'Unknown User'}</h4>
                                    <small className="text-muted text-xs ml-3 whitespace-nowrap flex items-center gap-1 flex-shrink-0"> 
                                        <IconClock className="icon" /> {timeText}
                                    </small>
                                </div>

                                <p className="text-gray-700 mt-1 text-sm break-words break-all whitespace-pre-wrap max-w-full">{comment.comment_text || comment.content || ''}</p>
                                {/* Actions for comment owner/admin could go here */}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PostCommentsList;
