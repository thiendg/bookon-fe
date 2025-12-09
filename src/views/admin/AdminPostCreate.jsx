// src/pages/admin/views/AdminPostCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/services/post.service';
import { Helmet } from 'react-helmet-async';
import { IconLink, IconFileText, IconTag, IconArticle, IconStatusChange } from '@tabler/icons-react';
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';
import ImageUploadInput from '@/components/admin/ImageUploadInput';

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
];

const AdminPostCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        meta_title: '',
        meta_description: '',
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        } else {
            setThumbnailFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!formData.title.trim() || !formData.content.trim()) {
            setError('Title and Content are required.');
            setSubmitting(false);
            return;
        }

        try {
            const postData = {
                ...formData,
                user_id: 1, // Hardcode admin user ID for now
            };

            if (thumbnailFile) {
                postData.thumbnail_image = thumbnailFile;
            }

            const response = await postService.createPost(postData);

            if (response.success) {
                setSuccessMessage('Post created successfully!');
                setTimeout(() => navigate('/admin/posts'), 1500);
            } else {
                throw new Error(response.message || 'Failed to create post');
            }
        } catch (err) {
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || err.message || 'An error occurred during creation.');
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
                    icon={IconArticle}
                />

                <ImageUploadInput
                    label="Thumbnail Image"
                    name="thumbnail_image"
                    onChange={handleFileChange}
                    smallText="Upload a thumbnail for the post."
                />

                <TextInput
                    label="Content"
                    name="content"
                    type="textarea"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter post content"
                    required
                    rows={12}
                />

                <hr className="my-4" />
                <h3 className="card-title mb-3">SEO & Metadata</h3>

                <TextInput
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="custom-url-slug (auto-generated if left blank)"
                    icon={IconLink}
                />

                 <SelectInput
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                    required
                    icon={IconStatusChange}
                />

                <TextInput
                    label="Meta Title"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    placeholder="Enter meta title for SEO"
                    icon={IconFileText}
                />

                <TextInput
                    label="Meta Description"
                    name="meta_description"
                    type="textarea"
                    value={formData.meta_description}
                    onChange={handleChange}
                    placeholder="Enter meta description for SEO"
                    rows={3}
                    icon={IconTag}
                />
            </AdminForm>
        </>
    );
};

export default AdminPostCreate;
