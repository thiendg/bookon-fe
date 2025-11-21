// src/pages/admin/views/AdminCategoryDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { categoryService } from '@/services/category.service';
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconCategory, IconX } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';


const AdminCategoryDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchCategory = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await categoryService.getCategoryById(id);
            if (response.success) {
                setCategory(response.data);
                setCategoryName(response.data.name);
            } else {
                throw new Error(response.message || 'Failed to fetch category details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching category details.');
            setCategory(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!categoryName.trim()) {
            setError('Category name is required.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                name: categoryName,
                // parent_id: category.parent_id, // Uncomment and implement if nested categories are needed
            };
            const response = await categoryService.updateCategory(id, updateData);
            if (response.success) {
                setSuccessMessage('Category updated successfully!');
                fetchCategory(); // Refresh data to ensure consistency
            } else {
                throw new Error(response.message || 'Failed to update category');
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
                    <IconCategory className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading category details...</p>
            </div>
        );
    }

    if (error && !category) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load category details. <Link to="/admin/categories">Go back to Category List</Link></p>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconCategory className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Category not found</p>
                <p className="empty-subtitle">The category with ID "{id}" does not exist. <Link to="/admin/categories">Go back to Category List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Category: {category.name} | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Edit Category: ${category.name}`}
                backLink="/admin/categories"
                backLinkText="Back to Categories"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Category Name"
                    name="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                    icon={IconCategory}
                />
                {/* Uncomment and implement if nested categories are needed
                <SelectInput
                    label="Parent Category"
                    name="parent_id"
                    value={category.parent_id || ''}
                    onChange={(e) => setCategory(prev => ({...prev, parent_id: e.target.value}))}
                    options={parentCategories} // Replace with fetched parent categories
                    icon={IconList}
                />
                */}
            </AdminForm>
        </>
    );
};

export default AdminCategoryDetail;
