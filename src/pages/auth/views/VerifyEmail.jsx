import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState(token ? 'verifying' : 'error');
    const [message, setMessage] = useState(token ? '' : 'Invalid verification link');
    const { verifyEmail } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async (verificationToken) => {
            try {
                const result = await verifyEmail(verificationToken);

                if (result.success) {
                    setStatus('success');
                    setMessage('Email verified successfully! Redirecting to login...');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setStatus('error');
                    setMessage(result.message || 'Verification failed');
                }
            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'An error occurred');
            }
        };

        if (token) {
            verify(token);
        }
    }, [token, verifyEmail, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Email Verification
                </h2>
                <div className="text-center">
                    {status === 'verifying' && <p>Verifying your email...</p>}
                    {status === 'success' && <p className="text-green-600">{message}</p>}
                    {status === 'error' && <p className="text-red-600">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;