import React, { useEffect, useState, useCallback } from "react";
import BasePage from "@/components/BasePage";
import { booksService } from "@/services/books.service";
import { categoryService } from '@/services/category.service';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { API_CONFIG } from '@/config/api.config';

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
        <a
            key={book.id}
            href={`/books/${book.id}`}
            className="group w-[140px] sm:w-[160px] md:w-[180px] lg:w-[190px] bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col"
        >
            <div className="w-full bg-gradient-to-b from-slate-100 to-slate-50">
                <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col px-3 pt-3 pb-4">
                <div className="text-[13px] font-semibold mb-1 leading-snug line-clamp-2">
                    {book.title}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                    {book.author || "Unknown Author"}
                </div>
                <div className="mt-auto text-sm font-bold text-[#0b7560]">
                    {formatCurrency(book.price)}
                </div>
            </div>
        </a>
    );
};


const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const debouncedMinPrice = useDebounce(minPrice, 500);
    const debouncedMaxPrice = useDebounce(maxPrice, 500);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategories();
                if (response && response.success && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Failed to fetch categories:', response);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const loadBooks = useCallback(async () => {
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
            const data = response.data || {};

            let list = [];
            let paginationInfo = {};

            if (data && data.pagination) {
                list = data.data || [];
                paginationInfo = data.pagination;
            } else if (Array.isArray(data)) {
                list = data;
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
            console.error('[BookList] loadBooks error:', err);
            setError(err.message || 'An error occurred while fetching books.');
            setBooks([]);
            setTotalItems(0);
            setTotalPages(1);
            setCurrentPage(1);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, debouncedSearchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice]);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <BasePage title="Book List" currentPage="home">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Book List</h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Search and choose the books that best fit your needs.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-4 mb-8">
                    <div className="relative flex-grow sm:w-1/2 lg:w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, author, or genre..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="block w-full sm:w-1/2 lg:w-1/4 pr-8 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-2 w-full sm:w-full lg:w-1/4">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setMinPrice(value < 0 ? 0 : e.target.value);
                                setCurrentPage(1);
                            }}
                            step="1000"
                            className="block w-1/2 pr-3 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setMaxPrice(value < 0 ? 0 : e.target.value);
                                setCurrentPage(1);
                            }}
                            step="1000"
                            className="block w-1/2 pr-3 pl-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="mb-4 text-gray-600 text-sm text-center">
                        Loading data…
                    </div>
                )}
                {error && !loading && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>

                {!loading && !error && books.length === 0 && (
                    <div className="mt-6 text-gray-600 text-sm text-center">
                        No products matched your search keyword.
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
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

export default BookList;
