// src/pages/admin/views/AdminCategoryCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { categoryService } from '@/services/category.service';
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconCategory } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';


const AdminCategoryCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        parent_id: '' // For nested categories, can be null
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

        if (!formData.name.trim()) {
            setError('Category name is required.');
            setSubmitting(false);
            return;
        }

        try {
            const createData = {
                name: formData.name,
                // parent_id: formData.parent_id || null, // Uncomment and implement if nested categories are needed
            };
            const response = await categoryService.createCategory(createData);
            if (response.success) {
                setSuccessMessage('Category created successfully!');
                setFormData({ // Clear form
                    name: '',
                    parent_id: ''
                });
                setTimeout(() => navigate('/admin/categories'), 1500); // Redirect after success
            } else {
                throw new Error(response.message || 'Failed to create category');
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
                <title>Create New Category | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New Category"
                backLink="/admin/categories"
                backLinkText="Back to Categories"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create Category"
            >
                <TextInput
                    label="Category Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                    icon={IconCategory}
                />
                {/* Uncomment and implement if nested categories are needed
                <SelectInput
                    label="Parent Category"
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleChange}
                    options={parentCategories} // Replace with fetched parent categories
                    icon={IconList}
                />
                */}
            </AdminForm>
        </>
    );
};

export default AdminCategoryCreate;
