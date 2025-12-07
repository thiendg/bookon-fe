// src/pages/home/views/CategoryBooks.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { booksService } from '@/services/books.service';
import { categoryService } from '@/services/category.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const BookCard = ({ book }) => {
    // A placeholder image if the book has no cover
    const imageUrl = book.cover_image_url
        ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}`
        : 'https://source.unsplash.com/random/300x400/?book';

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount) || 0);
    };

    return (
        <Link to={`/books/${book.id}`} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full no-underline">
            <img src={imageUrl} alt={book.title} className="w-full h-48 sm:h-64 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-md sm:text-lg mb-2 truncate text-gray-900">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{book.author || 'Unknown Author'}</p>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
                    <span className="text-indigo-600 font-semibold mb-2 sm:mb-0">{formatCurrency(book.price)}</span>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic here
                        }}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 w-full sm:w-auto"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};


const CategoryBooks = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Books per page
    // eslint-disable-next-line no-unused-vars
    const [totalPages, setTotalPages] = useState(1);


    const fetchCategoryDetails = useCallback(async () => {
        try {
            const response = await categoryService.getCategoryById(categoryId);
            if (response.success) {
                setCategory(response.data);
            } else {
                setCategory(null);
            }
        } catch (err) {
            console.error("Failed to fetch category details:", err);
            setCategory(null);
        }
    }, [categoryId]);

    const fetchBooksByCategory = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await booksService.getBooks({
                page: currentPage,
                pageSize: pageSize,
                category_id: categoryId
            });
            if (response.success) {
                setBooks(response.data.data || []); // Correctly extract books
                setTotalPages(response.data.pagination.totalPages || 1); // Assuming API returns totalPages
            } else {
                throw new Error(response.message || 'Failed to fetch books in this category');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching books.');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, categoryId]);

    useEffect(() => {
        fetchCategoryDetails();
        fetchBooksByCategory();
    }, [fetchCategoryDetails, fetchBooksByCategory]);

    return (
        <BasePage title={category ? category.name : "Category Books"}>
            <Helmet>
                <meta name="description" content={category ? `Browse books in the ${category.name} category.` : "Browse books by category."} />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Books in "{category ? category.name : 'Category'}"
                </h1>

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading books...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Error</h3>
                        <p>{error}</p>
                        <Link to="/categories" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to Categories</Link>
                    </div>
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800">No Books Found</h3>
                        <p className="text-gray-500">There are no books in this category yet. <Link to="/categories" className="text-indigo-600 hover:underline">Browse other categories</Link>.</p>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default CategoryBooks;
