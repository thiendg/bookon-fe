// src/pages/home/views/CategoryList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/category.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { IconCategory } from '@tabler/icons-react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await categoryService.getCategories({ limit: 100 }); // Fetch all or a large number for browsing
            if (response.success) {
                setCategories(response.data.categories || []);
            } else {
                throw new Error(response.message || 'Failed to fetch categories');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching categories.');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <BasePage title="Categories">
            <Helmet>
                <meta name="description" content="Browse all book categories available on BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Browse Categories</h1>

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading categories...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Error</h3>
                        <p>{error}</p>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map(category => (
                            <Link key={category.id} to={`/categories/${category.id}`} className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="p-4 flex items-center space-x-4">
                                    <IconCategory className="h-8 w-8 text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800">No Categories Found</h3>
                        <p className="text-gray-500">There are no categories to display yet.</p>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default CategoryList;
