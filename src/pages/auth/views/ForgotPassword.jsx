// src/pages/auth/views/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';
import { BookOpenIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            // The backend should always return success for this endpoint for security reasons
            await forgotPassword(email);
            setMessage("If an account with that email exists, we've sent a link to reset your password.");
            setEmail('');
        } catch (err) {
            console.error("Forgot password error:", err);
            // Even if the API fails, show a generic message to prevent user enumeration
            setMessage("If an account with that email exists, we've sent a link to reset your password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left-side: Image */}
            <div className="hidden lg:block relative w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x900/?book,question')" }}>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center p-12 text-white">
                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">Forgot Your Password?</h1>
                        <p className="text-lg text-gray-200">No worries. Enter your email and we'll guide you through the reset process.</p>
                    </div>
                </div>
            </div>

            {/* Right-side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                     <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center text-3xl font-bold text-gray-900">
                            <BookOpenIcon className="h-8 w-8 mr-2 text-indigo-600" />
                            BookOn
                        </Link>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                            Reset Your Password
                        </h2>
                    </div>

                    {message && !error && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg" role="alert">
                            {message}
                        </div>
                    )}
                     {error && (
                        <div className="p-4 mb-6 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            <button
                                type="submit"
                                disabled={loading || message}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending Link...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link <PaperAirplaneIcon className="h-5 w-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Remembered your password?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;