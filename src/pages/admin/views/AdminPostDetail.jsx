// src/pages/admin/views/AdminPostDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService } from '@/services/post.service';
import { Helmet } from 'react-helmet-async';
import {
    IconUser,
    IconEdit,
    IconNews
} from '@tabler/icons-react';
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';

// For user selection, will eventually use a select endpoint
const DUMMY_USERS = [
    { value: 1, label: 'Admin User' },
    { value: 2, label: 'Test User' },
];

const AdminPostDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        user_id: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchPost = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await postService.getPostById(id);
            if (response.success) {
                setPost(response.data);
                setFormData({
                    title: response.data.title,
                    content: response.data.content,
                    user_id: response.data.user_id,
                });
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
        fetchPost();
    }, [fetchPost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!post) {
            setError('No post data to update.');
            setSubmitting(false);
            return;
        }

        if (!formData.title.trim() || !formData.content.trim() || !formData.user_id) {
            setError('All fields are required.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                title: formData.title,
                content: formData.content,
                user_id: formData.user_id,
            };
            const response = await postService.updatePost(id, updateData);
            if (response.success) {
                setSuccessMessage('Post updated successfully!');
                fetchPost(); // Refresh data to ensure consistency
            } else {
                throw new Error(response.message || 'Failed to update post');
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
                    <IconNews className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading post details...</p>
            </div>
        );
    }

    if (error && !post) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load post details. <Link to="/admin/posts">Go back to Post List</Link></p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconNews className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Post not found</p>
                <p className="empty-subtitle">The post with ID "{id}" does not exist. <Link to="/admin/posts">Go back to Post List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Edit Post: ${post?.title || ''} | Admin - BookOn`}</title>
            </Helmet>
            <AdminForm
                title={`Edit Post: ${post.title}`}
                backLink="/admin/posts"
                backLinkText="Back to Posts"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    required
                />
                <TextInput
                    label="Content"
                    name="content"
                    type="textarea"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter post content"
                    required
                    rows={8}
                />
                <SelectInput
                    label="Author"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    options={DUMMY_USERS} // Replace with fetched user options
                    required
                    // disabled={usersLoading || usersError} // Add these states later
                    // loading={usersLoading}
                    // error={usersError}
                    icon={IconUser}
                />
            </AdminForm>
        </>
    );
};

export default AdminPostDetail;
