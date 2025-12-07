// src/pages/auth/views/AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    console.log('AdminRoute: Rendered');
    console.log('AdminRoute: isAuthenticated', isAuthenticated, 'user', user, 'loading', loading, 'pathname', location.pathname);

    if (loading) {
        console.log('AdminRoute: Still loading auth state...');
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
        console.log('AdminRoute: Not authenticated, redirecting to /login');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user is an admin using role_id
    const isAdmin = user && user.role_id === 1;
    console.log('AdminRoute: User is admin?', isAdmin, 'user.role_id', user?.role_id);

    if (!isAdmin) {
        console.log('AdminRoute: Not an admin, redirecting to /');
        return <Navigate to="/" replace />;
    }

    console.log('AdminRoute: User is authenticated and admin, rendering children.');
    return children;
};

export default AdminRoute;
