// src/pages/home/views/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { bookService } from '@/services/book.service';
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
    // A placeholder image if the book has no cover
    const imageUrl = book.cover_image_url 
        ? `${import.meta.env.VITE_API_URL}/public/uploads/${book.cover_image_url}`
        : 'https://source.unsplash.com/random/300x400/?book';

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <img src={imageUrl} alt={book.title} className="w-full h-64 object-cover"/>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 truncate">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{book.author || 'Unknown Author'}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-indigo-600 font-semibold">${parseFloat(book.price).toFixed(2)}</span>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
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

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await bookService.getBooks({ search: debouncedSearchTerm });
            if (response.success) {
                setBooks(response.data.data || []); // Correctly extract books
                // You might also want to set pagination state here if Dashboard had pagination
                // setTotalPages(response.data.pagination.totalPages || 1);
            } else {
                throw new Error(response.message || 'Failed to fetch books');
            }
        } catch (err) {
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center py-12 bg-gray-50 rounded-lg mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Find Your Next</span>
                        <span className="block text-indigo-600">Favorite Book</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Explore our vast collection of books. From timeless classics to modern bestsellers, your next adventure is just a page away.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, author, or genre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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