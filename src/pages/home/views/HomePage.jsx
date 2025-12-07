// src/pages/home/views/HomePage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
import { booksService } from '@/services/books.service';
import { categoryService } from '@/services/category.service'; // New Import
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

    // New state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Books per page
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // New state for categories and filters
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
    const debouncedMinPrice = useDebounce(minPrice, 500);
    const debouncedMaxPrice = useDebounce(maxPrice, 500);

    const _unwrapResponse = (resp) => {
        if (!resp) return {};
        if (Array.isArray(resp)) return resp;
        // Check for common pagination structures
        if (resp.data && resp.data.pagination) return resp.data;
        if (resp.data && Array.isArray(resp.data.data)) return resp.data; // For list within data
        return resp;
    };

    // Effect to fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategories(); // Assuming this returns { data: { options: [...] }, ... }
                if (response && response.success && Array.isArray(response.data.options)) {
                    setCategories(response.data.options);
                } else {
                    console.error('Failed to fetch categories:', response);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []); // Empty dependency array means this runs once on mount

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                page: currentPage,
                pageSize: pageSize,
                ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
                ...(selectedCategory && { category_id: selectedCategory }),
                ...(debouncedMinPrice && { min_price: debouncedMinPrice }),
                ...(debouncedMaxPrice && { max_price: debouncedMaxPrice }),
            };

            const response = await booksService.getBooks(params);
            const data = _unwrapResponse(response);

            console.debug('[HomePage] booksService.getBooks response:', response);

            let list = [];
            let paginationInfo = {};

            if (data && data.pagination) {
                list = data.data || [];
                paginationInfo = data.pagination;
            } else if (Array.isArray(data)) {
                list = data;
                // If no pagination info, assume single page
                paginationInfo = { totalItems: data.length, totalPages: 1, currentPage: 1, pageSize: data.length, hasNextPage: false, hasPrevPage: false };
            } else if (Array.isArray(data.data)) {
                list = data.data;
                paginationInfo = { totalItems: data.data.length, totalPages: 1, currentPage: 1, pageSize: data.data.length, hasNextPage: false, hasPrevPage: false };
            }

            setBooks(list);
            setTotalItems(paginationInfo.totalItems || 0);
            setTotalPages(paginationInfo.totalPages || 1);
            setCurrentPage(paginationInfo.currentPage || 1);

        } catch (err) {
            console.error('[HomePage] fetchBooks error:', err);
            setError(err.message || 'An error occurred while fetching books.');
            setBooks([]);
            setTotalItems(0);
            setTotalPages(1);
            setCurrentPage(1);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, debouncedSearchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice]); // Dependencies for useCallback

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

                {/* Search, Category, and Price Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
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

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Reset to first page on category change
                        }}
                        className="block w-full sm:w-auto pr-8 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>

                    {/* Price Range Filter */}
                    <div className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                setCurrentPage(1); // Reset to first page on price change
                            }}
                            className="block w-1/2 pr-3 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                setCurrentPage(1); // Reset to first page on price change
                            }}
                            className="block w-1/2 pr-3 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default HomePage;