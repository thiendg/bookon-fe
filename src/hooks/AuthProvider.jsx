import React, { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const data = await authService.checkAuth();

            if (data.success && data.data.authenticated) {
                setUser(data.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            if (error && error.message === 'Authentication required.') {
                setUser(null);
            } else {
                console.error('Auth check failed:', error);
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        return data;
    };

    const login = async (email, password, rememberMe = false) => {
        const data = await authService.login(email, password, rememberMe);

        if (data.success) {
            setUser(data.data.user);
        }

        return data;
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);

            setUser(null);
        }
    };

    const verifyEmail = async (token) => {
        const data = await authService.verifyEmail(token);
        return data;
    };

    const forgotPassword = async (email) => {
        const data = await authService.forgotPassword(email);
        return data;
    };

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
        refreshAuth: checkAuth
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};