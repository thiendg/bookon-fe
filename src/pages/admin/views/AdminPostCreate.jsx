// src/pages/admin/views/AdminPostCreate.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postService } from '@/services/post.service';
import { Helmet } from 'react-helmet-async';
import { IconArrowLeft, IconUser } from '@tabler/icons-react';

// For user selection, will eventually use a select endpoint
const DUMMY_USERS = [
    { value: 1, label: 'Admin User' },
    { value: 2, label: 'Test User' },
];

const AdminPostCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        user_id: '', // User who creates the post
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!formData.title.trim() || !formData.content.trim() || !formData.user_id) {
            setError('All fields are required.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await postService.createPost(formData);
            if (response.success) {
                setSuccessMessage('Post created successfully!');
                setFormData({ // Clear form
                    title: '',
                    content: '',
                    user_id: '',
                });
                setTimeout(() => navigate('/admin/posts'), 1500); // Redirect after success
            } else {
                throw new Error(response.message || 'Failed to create post');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during creation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Create New Post | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New Post"
                backLink="/admin/posts"
                backLinkText="Back to Posts"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create Post"
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

export default AdminPostCreate;
