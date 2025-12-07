// src/pages/auth/views/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';
import { BookOpenIcon, UserPlusIcon } from '@heroicons/react/24/solid';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic validation
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        try {
            const result = await register({ email, full_name: fullName, password });

            if (result.success) {
                setSuccess('Registration successful! Check your email to verify your account.');
                // Clear form
                setFullName('');
                setEmail('');
                setPassword('');
                // Redirect after a short delay
                setTimeout(() => navigate('/verify-email'), 3000);
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Left-side: Image and Welcome Text */}
            <div className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x900/?book,education')" }}>
                <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-60 p-12 text-white">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold leading-tight mb-4">Join the BookOn Community</h1>
                        <p className="text-lg text-gray-200">Create an account to start your journey, discover new books, and connect with fellow readers.</p>
                    </div>
                </div>
            </div>

            {/* Right-side: Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center text-3xl font-bold text-gray-900">
                            <BookOpenIcon className="h-8 w-8 mr-2 text-indigo-600" />
                            BookOn
                        </Link>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                            Create a New Account
                        </h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg" role="alert">
                                {error}
                            </div>
                        )}
                        {success && !error && (
                            <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg" role="alert">
                                {success}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full-name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !!success}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Sign Up <UserPlusIcon className="h-5 w-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Register;