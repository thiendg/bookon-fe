// src/pages/home/views/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth.hook';
import { usersService } from '@/services/users.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconUser, IconMail, IconKey, IconEdit, IconCheck } from '@tabler/icons-react';

const ProfilePage = () => {
    const { user, refreshAuth } = useAuth();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const [loading, setLoading] = useState(true); // For initial fetch
    const [submitting, setSubmitting] = useState(false); // For form submission
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                full_name: user.full_name || '',
                email: user.email || ''
            }));
            setLoading(false);
        } else {
            // Should not happen if protected by ProtectedRoute, but good for safety
            setLoading(false); 
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!user || !user.id) {
            setError('User not found.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                full_name: formData.full_name,
                email: formData.email,
            };

            const response = await usersService.updateUser(user.id, updateData);
            if (response.success) {
                setSuccessMessage('Profile updated successfully!');
                refreshAuth(); // Refresh user data in context
            } else {
                throw new Error(response.message || 'Failed to update profile');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during profile update.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!user || !user.id) {
            setError('User not found.');
            setSubmitting(false);
            return;
        }

        if (formData.new_password.length < 8) {
            setError('New password must be at least 8 characters long.');
            setSubmitting(false);
            return;
        }
        if (formData.new_password !== formData.confirm_new_password) {
            setError('New passwords do not match.');
            setSubmitting(false);
            return;
        }

        try {
            // Note: The backend's `updateUser` currently expects JSON `password` field for update.
            // We are using `current_password` and `new_password` for frontend validation and clarity.
            // Adjust `usersService.updateUser` or backend API if needed to handle current_password for security.
            const updateData = {
                password: formData.new_password, // Sending new_password as 'password' to backend
                // A real app would send current_password for verification here
            };

            const response = await usersService.updateUser(user.id, updateData);
            if (response.success) {
                setSuccessMessage('Password updated successfully!');
                setFormData(prev => ({ // Clear password fields
                    ...prev,
                    current_password: '',
                    new_password: '',
                    confirm_new_password: ''
                }));
            } else {
                throw new Error(response.message || 'Failed to update password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during password update.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <BasePage title="Loading Profile">
                <div className="container mx-auto px-4 py-8 text-center">Loading user profile...</div>
            </BasePage>
        );
    }

    if (!user) {
        return (
            <BasePage title="Profile Not Found">
                <div className="container mx-auto px-4 py-8 text-center text-red-600">User profile not found. Please log in.</div>
            </BasePage>
        );
    }

    return (
        <BasePage title="My Profile">
            <Helmet>
                <meta name="description" content="Manage your user profile and settings on BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">My Profile</h1>

                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                <div className="row row-cards">
                    <div className="col-md-6">
                        <form className="card" onSubmit={handleUpdateProfile}>
                            <div className="card-header">
                                <h3 className="card-title">Personal Information</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <div className="input-icon">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                        <span className="input-icon-addon">
                                            <IconUser />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <div className="input-icon">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your email"
                                            required
                                        />
                                        <span className="input-icon-addon">
                                            <IconMail />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <form className="card" onSubmit={handleUpdatePassword}>
                            <div className="card-header">
                                <h3 className="card-title">Change Password</h3>
                            </div>
                            <div className="card-body">
                                {/*
                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <div className="input-icon">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="current_password"
                                            value={formData.current_password}
                                            onChange={handleChange}
                                            placeholder="Enter current password"
                                        />
                                        <span className="input-icon-addon">
                                            <IconKey />
                                        </span>
                                    </div>
                                </div>
                                */}
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <div className="input-icon">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="new_password"
                                            value={formData.new_password}
                                            onChange={handleChange}
                                            placeholder="Enter new password (min 8 characters)"
                                            required
                                            minLength="8"
                                        />
                                        <span className="input-icon-addon">
                                            <IconKey />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password</label>
                                    <div className="input-icon">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_new_password"
                                            value={formData.confirm_new_password}
                                            onChange={handleChange}
                                            placeholder="Confirm new password"
                                            required
                                        />
                                        <span className="input-icon-addon">
                                            <IconKey />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Updating...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </BasePage>
    );
};

export default ProfilePage;
