// src/pages/auth/views/AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth(); // Get user object directly
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect non-logged-in users to the login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user is an admin using role_id
    if (!user || user.role_id !== 1) { // Assuming role_id 1 is Admin
        // Redirect non-admin users to the home page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
