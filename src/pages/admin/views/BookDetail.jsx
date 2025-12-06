// src/pages/admin/views/BookDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { bookService } from '@/services/book.service';
import { categoryService } from '@/services/category.service'; // Import categoryService
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import {
    IconBook,
    IconPencil,
    IconCurrencyDollar,
    IconStack,
    IconWorld, // Added IconWorld for publisher
    IconList
} from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';
import ImageUploadInput from '@/components/admin/ImageUploadInput';


const BookDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [categories, setCategories] = useState([]); // State for dynamically fetched categories
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState('');

    const fetchBook = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await bookService.getBookById(id);
            if (response.success) {
                setBook(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch book details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching book details.');
            setBook(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

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
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevBook => ({
            ...prevBook,
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!book) {
            setError('No book data to update.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                title: book.title,
                author: book.author,
                description: book.description,
                price: book.price,
                stock_quantity: book.stock_quantity,
                category_id: book.category_id,
                publisher: book.publisher,
                publication_year: book.publication_year,
                slug: book.slug,
            };

            if (coverImageFile) {
                updateData.images = [coverImageFile]; // Backend expects an array of images
            }
            
            const response = await bookService.updateBook(id, updateData);
            if (response.success) {
                setSuccessMessage('Book updated successfully!');
                setCoverImageFile(null); // Clear file input
                // Optionally refetch book data to ensure UI is up-to-date, especially for new image URL
                fetchBook(); 
            } else {
                throw new Error(response.message || 'Failed to update book');
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
                    <IconBook className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading book details...</p>
            </div>
        );
    }

    if (error && !book) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconBook className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load book details. <Link to="/admin/books">Go back to Book List</Link></p>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconBook className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Book not found</p>
                <p className="empty-subtitle">The book with ID "{id}" does not exist. <Link to="/admin/books">Go back to Book List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Edit Book: ${book?.title || ''} | Admin - BookOn`}</title>
            </Helmet>
            <AdminForm
                title={`Edit Book: ${book.title}`}
                backLink="/admin/books"
                backLinkText="Back to Books"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Title"
                    name="title"
                    value={book.title || ''}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    required
                    icon={IconBook}
                />
                <TextInput
                    label="Author"
                    name="author"
                    value={book.author || ''}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                    icon={IconPencil}
                />
                <TextInput
                    label="Description"
                    name="description"
                    type="textarea"
                    value={book.description || ''}
                    onChange={handleChange}
                    placeholder="Enter book description"
                    required
                    rows={5}
                />
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={book.price || ''}
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
                    value={book.stock_quantity || ''}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    required
                    min="0"
                    icon={IconStack}
                />
                <SelectInput
                    label="Category"
                    name="category_id"
                    value={book.category_id || ''}
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
                    value={book.publisher || ''}
                    onChange={handleChange}
                    placeholder="Enter publisher"
                    icon={IconWorld}
                />
                <TextInput
                    label="Publication Year"
                    name="publication_year"
                    type="number"
                    value={book.publication_year || ''}
                    onChange={handleChange}
                    placeholder="Enter publication year"
                    min="1000"
                    max={new Date().getFullYear()}
                    icon={IconBook} // Re-using IconBook, consider a more specific icon
                />
                <TextInput
                    label="Slug"
                    name="slug"
                    value={book.slug || ''}
                    onChange={handleChange}
                    placeholder="Enter URL slug"
                    icon={IconList} // Re-using IconList
                />
                <ImageUploadInput
                    label="Cover Image"
                    name="cover_image"
                    onChange={handleFileChange}
                    currentImageUrl={book?.cover_image_url ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}` : null}
                    smallText="Upload a new image to replace the current cover."
                />
            </AdminForm>
        </>
    );
};

export default BookDetail;
