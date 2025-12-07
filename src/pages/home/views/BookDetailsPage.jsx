// src/pages/home/views/BookDetailsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { booksService } from '@/services/books.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { ShoppingCartIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookDetails = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await booksService.getBookById(id);
            if (response.success) {
                setBook(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch book details');
            }
        } catch (err) => {
    setError(err.message || 'An error occurred while fetching book details.');
    setBook(null);
} finally {
    setLoading(false);
}
    }, [id]);

useEffect(() => {
    fetchBookDetails();
}, [fetchBookDetails]);

// Placeholder for Add to Cart functionality
const handleAddToCart = () => {
    alert(`"${book.title}" added to cart! (Functionality not yet implemented)`);
};

const imageUrl = book?.cover_image_url
    ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}`
    : 'https://source.unsplash.com/random/300x400/?book';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount) || 0);
};

return (
    <BasePage title={book ? book.title : "Book Details"}>
        <Helmet>
            <meta name="description" content={book ? book.description.substring(0, 160) : "Detailed information about a book."} />
        </Helmet>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {loading ? (
                <div className="text-center py-10">
                    <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Loading book details...</p>
                </div>
            ) : error ? (
                <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                    <h3 className="font-semibold">Error</h3>
                    <p>{error}</p>
                    <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
                </div>
            ) : !book ? (
                <div className="text-center py-10 px-4 bg-gray-50 text-gray-700 rounded-lg">
                    <h3 className="font-semibold">Book Not Found</h3>
                    <p>The book you are looking for does not exist.</p>
                    <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 bg-white p-4 sm:p-8 rounded-lg shadow-md">
                    <div className="lg:col-span-1 flex justify-center items-start">
                        <img src={imageUrl} alt={book.title} className="w-full max-w-sm lg:max-w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{book.title}</h1>
                        <p className="text-lg sm:text-xl text-gray-700">by <span className="font-semibold">{book.author}</span></p>
                        <p className="text-gray-600">Category: <Link to={`/categories/${book.category_id}`} className="font-medium text-indigo-600 hover:underline">{book.category_name || 'N/A'}</Link></p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                            <span className="text-3xl font-bold text-indigo-700">
                                {formatCurrency(book.price)}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${book.stock_quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {book.stock_quantity > 0 ? <CheckCircleIcon className="h-5 w-5 mr-1.5" /> : <XCircleIcon className="h-5 w-5 mr-1.5" />}
                                {book.stock_quantity > 0 ? `${book.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{book.description}</p>

                        <hr className="my-4 sm:my-6" />

                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                            {book.publisher && <span className="bg-gray-100 px-3 py-1 rounded-full">Publisher: {book.publisher}</span>}
                            {book.publication_year && <span className="bg-gray-100 px-3 py-1 rounded-full">Published: {book.publication_year}</span>}
                            {book.isbn && <span className="bg-gray-100 px-3 py-1 rounded-full">ISBN: {book.isbn}</span>}
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                                disabled={book.stock_quantity <= 0}
                            >
                                <ShoppingCartIcon className="h-6 w-6 mr-2" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </BasePage>
);
};

export default BookDetailsPage;
