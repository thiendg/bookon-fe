import React, { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        checkAuth();
    }, []);

    /**
     * Check if user is authenticated
     * Tries session first, then persistent login cookie
     */
    const checkAuth = async () => {
        try {
            const data = await authService.checkAuth();

            if (data.success && data.data.authenticated) {
                setUser(data.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Register new user
     */
    const register = async (email, name, password) => {
        const data = await authService.register({ email, name, password });
        return data;
    };

    /**
     * Login user
     */
    const login = async (email, password, rememberMe = false) => {
        const data = await authService.login(email, password, rememberMe);

        if (data.success) {
            setUser(data.data.user);
        }

        return data;
    };

    /**
     * Logout user
     */
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            // Clear user even if API call fails
            setUser(null);
        }
    };

    /**
     * Verify email with token
     */
    const verifyEmail = async (token) => {
        const data = await authService.verifyEmail(token);
        return data;
    };

    /**
     * Request password reset
     */
    const forgotPassword = async (email) => {
        const data = await authService.forgotPassword(email);
        return data;
    };

    /**
     * Reset password with token
     */
    const resetPassword = async (token, password) => {
        const data = await authService.resetPassword(token, password);
        return data;
    };

    const userRole = user ? user.role_name : null;
    const isAdmin = userRole === 'Admin';

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        userRole,
        isAdmin,
        register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        refreshAuth: checkAuth // Manually trigger auth check if needed
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};