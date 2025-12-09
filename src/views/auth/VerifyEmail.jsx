// src/pages/auth/views/VerifyEmail.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { EnvelopeOpenIcon } from '@heroicons/react/24/solid';

const VerifyEmail = () => { // Renamed from VerifyEmailPage to VerifyEmail
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Get token from URL params if available (for direct email links)
    useEffect(() => {
        const urlToken = searchParams.get('token');
        if (urlToken) {
            setToken(urlToken);
            // Optionally auto-submit if token is present in URL
            handleSubmit(null, urlToken);
        }
    }, [searchParams]);

    const handleSubmit = async (e, urlToken = null) => {
        if (e) e.preventDefault(); // Prevent default form submission if triggered by form

        const verificationToken = urlToken || token;

        if (!verificationToken) {
            setError('Verification token is required.');
            return;
        }

        setMessage('');
        setError('');
        setLoading(true);

        try {
            const result = await authService.verifyEmail(verificationToken);
            if (result.success) {
                setMessage('Email verified successfully! You can now log in.');
                setError('');
                // Redirect to login page after a delay
                setTimeout(() => navigate('/login'), 0); // Redirect immediately
            } else {
                setError(result.message || 'Email verification failed. Please check your token or try again.');
                setMessage('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An unexpected error occurred during verification.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <EnvelopeOpenIcon className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 mb-6">
                    Please enter the verification code you received in your email, or click the link in your email to automatically verify.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="token" className="sr-only">Verification Token</label>
                        <input
                            id="token"
                            name="token"
                            type="text"
                            autoComplete="off"
                            required
                            className="block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter your verification token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            disabled={loading || searchParams.get('token')} // Disable input if token is from URL or loading
                        />
                    </div>
                    
                    {error && (
                        <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}
                    {message && !error && (
                        <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg" role="alert">
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-sm text-gray-600">
                    Already verified?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;
