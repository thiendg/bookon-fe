// src/pages/admin/views/AdminPostDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService } from '@/services/post.service';
import { Helmet } from 'react-helmet-async';
import { IconNews, IconLink, IconFileText, IconTag, IconArticle, IconStatusChange, IconX } from '@tabler/icons-react';
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';
import ImageUploadInput from '@/components/admin/ImageUploadInput';
import AdminPostCommentsList from './AdminPostCommentList';

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
];

const AdminPostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        slug: '',
        status: 'draft',
        meta_title: '',
        meta_description: '',
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
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
                const postData = response.data;
                setPost(postData);
                setFormData({
                    title: postData.title || '',
                    content: postData.content || '',
                    slug: postData.slug || '',
                    status: postData.status || 'draft',
                    meta_title: postData.meta_title || '',
                    meta_description: postData.meta_description || '',
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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        } else {
            setThumbnailFile(null);
        }
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

        try {
            const updateData = { ...formData };
            if (thumbnailFile) {
                updateData.thumbnail_image = thumbnailFile;
            }
            
            const response = await postService.updatePost(id, updateData);
            if (response.success) {
                setSuccessMessage('Post updated successfully!');
                setThumbnailFile(null); // Clear file after successful upload
                fetchPost(); // Refresh data to ensure consistency
            } else {
                throw new Error(response.message || 'Failed to update post');
            }
        } catch (err) {
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || err.message || 'An error occurred during update.');
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
                    icon={IconArticle}
                />
                
                <ImageUploadInput
                    label="Thumbnail Image"
                    name="thumbnail_image"
                    onChange={handleFileChange}
                    currentImageUrl={post?.thumbnail_image_url ? `${import.meta.env.VITE_API_URL}/${post.thumbnail_image_url}` : null}
                    smallText="Upload a new image to replace the current one."
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
                    placeholder="custom-url-slug"
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
            <div className="mt-6">
                <h2 className="mb-3">Comments</h2>
                <AdminPostCommentsList postId={id} />
            </div>
        </>
    );
};

export default AdminPostDetail;
