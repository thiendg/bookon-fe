// src/pages/admin/views/AdminPostCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/services/post.service';
import { Helmet } from 'react-helmet-async';
import { IconUser, IconLink } from '@tabler/icons-react';
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';

const DUMMY_USERS = [
    { value: 1, label: 'Admin User' },
    { value: 2, label: 'Test User' },
];

const AdminPostCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        user_id: '',
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

        // Validation
        if (
            !formData.title.trim() ||
            !formData.slug.trim() ||
            !formData.content.trim() ||
            !formData.user_id
        ) {
            setError('All fields are required.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await postService.createPost(formData);

            if (response.success) {
                setSuccessMessage('Post created successfully!');
                setFormData({
                    title: '',
                    slug: '',
                    content: '',
                    user_id: '',
                });

                setTimeout(() => navigate('/admin/posts'), 1500);
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
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="custom-url-slug"
                    required
                    icon={IconLink}
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
                    options={DUMMY_USERS}
                    required
                    icon={IconUser}
                />
            </AdminForm>
        </>
    );
};

export default AdminPostCreate;
