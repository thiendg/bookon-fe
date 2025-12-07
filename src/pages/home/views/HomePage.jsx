// src/pages/home/views/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { bookService } from '@/services/book.service';
import { API_CONFIG } from '@/config/api.config';
import BasePage from '@/components/BasePage';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// A simple debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const BookCard = ({ book }) => {
    const getCoverImageUrl = (cover) => {
        const base = (API_CONFIG.BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        if (!cover) return 'https://source.unsplash.com/random/300x400/?book';
        if (cover.startsWith('http')) return cover;
        if (cover.startsWith('/')) return `${base}${cover}`;
        return `${base}/${cover}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount) || 0);
    };

    const imageUrl = getCoverImageUrl(book.cover_image_url || book.cover_image || '');

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <img src={imageUrl} alt={book.title} className="w-full h-48 sm:h-64 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-md sm:text-lg mb-2 truncate">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{book.author || 'Unknown Author'}</p>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
                    <span className="text-indigo-600 font-semibold mb-2 sm:mb-0">{formatCurrency(book.price)}</span>
                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 w-full sm:w-auto">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

    const _unwrapResponse = (resp) => {
        if (!resp) return {};
        if (Array.isArray(resp)) return resp;
        if (resp.data && (Array.isArray(resp.data) || resp.data.pagination || resp.data.data)) return resp.data;
        return resp;
    };

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = debouncedSearchTerm ? { search: debouncedSearchTerm } : {};
            const response = await bookService.getBooks(params);
            const data = _unwrapResponse(response);
            console.debug('[HomePage] bookService.getBooks response:', response);
            let list = [];
            if (Array.isArray(data)) list = data;
            else if (Array.isArray(data.data)) list = data.data;
            else if (response && response.success && Array.isArray(response.data)) list = response.data;

            console.debug('normalized book list:', list);
            setBooks(list);
        } catch (err) {
            console.error('[HomePage] fetchBooks error:', err);
            setError(err.message || 'An error occurred while fetching books.');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <BasePage title="Home" currentPage="home">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Hero Section */}
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        <span className="block">Find Your Next</span>
                        <span className="block text-indigo-600">Favorite Book</span>
                    </h1>
                    <p className="mt-3 max-w-sm mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-2xl">
                        Explore our vast collection of books. From timeless classics to modern bestsellers, your next adventure is just a page away.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-lg mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, author, or genre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Book List */}
                <div>
                    {loading ? (
                        <div className="text-center py-10">
                            <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-2 text-gray-600">Loading Books...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                            <h3 className="font-semibold">Error</h3>
                            <p>{error}</p>
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
                            <p className="text-gray-500">No books matched your search criteria. Try a different search.</p>
                        </div>
                    )}
                </div>

                {/* TODO: Add Pagination Controls */}
            </div>
        </BasePage>
    );
};

export default HomePage;