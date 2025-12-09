// src/pages/auth/views/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';
import { BookOpenIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing password reset token. Please request a new link.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (!token) {
            setError('Invalid or missing password reset token.');
            return;
        }

        setLoading(true);
        try {
            const result = await resetPassword(token, password);
            if (result.success) {
                setSuccess('Password has been reset successfully! Redirecting to login...');
                navigate('/login'); // Redirect immediately
            } else {
                setError(result.message || 'Failed to reset password. The link may have expired.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Left-side: Image */}
            <div className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x900/?book,lock')" }}>
                <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-60 p-12 text-white">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold leading-tight mb-4">Create a New Password</h1>
                        <p className="text-lg text-gray-200">Choose a strong password to keep your account secure.</p>
                    </div>
                </div>
            </div>
            
            {/* Right-side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center text-3xl font-bold text-gray-900">
                            <BookOpenIcon className="h-8 w-8 mr-2 text-indigo-600" />
                            BookOn
                        </Link>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                            Set a New Password
                        </h2>
                    </div>

                    {error && (
                        <div className="p-4 mb-6 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}
                    {success && !error && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg" role="alert">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength="8"
                                        className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={!token || !!success}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeSlashIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        minLength="8"
                                        className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={!token || !!success}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeSlashIcon className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !token || !!success}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Resetting Password...
                                    </>
                                ) : (
                                    <>
                                        Reset Password <KeyIcon className="h-5 w-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                     <p className="mt-8 text-center text-sm text-gray-600">
                        Need help?{' '}
                        <Link to="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;