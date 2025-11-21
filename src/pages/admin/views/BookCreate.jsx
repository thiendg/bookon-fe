// src/pages/admin/views/BookCreate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookService } from '@/services/book.service';
import { categoryService } from '@/services/category.service'; // Import categoryService
import { Helmet } from 'react-helmet-async';
import {
    IconBook,
    IconPencil,
    IconCurrencyDollar,
    IconStack,
    IconArrowLeft,
    // IconPlus was for 'New Book' button, which is now outside this component
    IconList,
    IconWorld // Added IconWorld for publisher
    // IconKey was for category dropdown, now using IconList
} from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';
import ImageUploadInput from '@/components/admin/ImageUploadInput';

// Removed temporary hardcoded categories

const BookCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '',
        publisher: '',
        publication_year: '',
        slug: '',
    });
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [categories, setCategories] = useState([]); // State for dynamically fetched categories
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            setCategoriesError('');
            try {
                const response = await categoryService.getCategories({ action: 'select' });
                if (response.success) {
                    setCategories(response.data || []);
                } else {
                    throw new Error(response.message || 'Failed to fetch categories');
                }
            } catch (err) {
                setCategoriesError(err.message || 'Error loading categories.');
                setCategories([]);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
        } else {
            setCoverImageFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!coverImageFile) {
            setError('Please upload a cover image.');
            setSubmitting(false);
            return;
        }

        try {
            const bookData = { ...formData, images: [coverImageFile] };
            const response = await bookService.createBook(bookData);
            if (response.success) {
                setSuccessMessage('Book created successfully!');
                setFormData({ // Clear form
                    title: '', author: '', description: '', price: '', stock_quantity: '', category_id: '', publisher: '', publication_year: '', slug: '',
                });
                setCoverImageFile(null); // Clear file input
                setTimeout(() => navigate('/admin/books'), 1500); // Redirect after success
            } else {
                throw new Error(response.message || 'Failed to create book');
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
                <title>Create New Book | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New Book"
                backLink="/admin/books"
                backLinkText="Back to Books"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create Book"
            >
                <TextInput
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    required
                    icon={IconBook}
                />
                <TextInput
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                    icon={IconPencil}
                />
                <TextInput
                    label="Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter book description"
                    required
                    rows={5}
                />
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    min="0"
                    step="0.01"
                    icon={IconCurrencyDollar}
                />
                <TextInput
                    label="Stock Quantity"
                    name="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    required
                    min="0"
                    icon={IconStack}
                />
                <SelectInput
                    label="Category"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    options={categories}
                    required
                    disabled={categoriesLoading || categoriesError}
                    loading={categoriesLoading}
                    error={categoriesError}
                    icon={IconList}
                />
                <TextInput
                    label="Publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="Enter publisher"
                    icon={IconWorld}
                />
                <TextInput
                    label="Publication Year"
                    name="publication_year"
                    type="number"
                    value={formData.publication_year}
                    onChange={handleChange}
                    placeholder="Enter publication year"
                    min="1000"
                    max={new Date().getFullYear()}
                    icon={IconBook} // Re-using IconBook, consider a more specific icon
                />
                <TextInput
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Enter URL slug"
                    icon={IconList} // Re-using IconList
                />
                <ImageUploadInput
                    label="Cover Image"
                    name="cover_image"
                    onChange={handleFileChange}
                    required
                    smallText="Upload the cover image for the new book."
                />
            </AdminForm>
        </>
    );
};

export default BookCreate;
