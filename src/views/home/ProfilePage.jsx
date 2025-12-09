// src/pages/home/views/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth.hook';
import { usersService } from '@/services/users.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconUser, IconMail, IconKey, IconPhone, IconHome } from '@tabler/icons-react';
import ImageUploadInput from '@/components/admin/ImageUploadInput';


const ProfilePage = () => {
    const { user, refreshAuth } = useAuth();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(true); // For initial fetch
    const [profileSubmitting, setProfileSubmitting] = useState(false);
    const [passwordSubmitting, setPasswordSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                full_name: user.full_name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                address: user.address || ''
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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        } else {
            setAvatarFile(null);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setProfileSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!user || !user.id) {
            setError('User not found.');
            setProfileSubmitting(false);
            return;
        }

        try {
            const updateData = {
                full_name: formData.full_name,
                email: formData.email,
                phone_number: formData.phone_number,
                address: formData.address,
            };

            if (avatarFile) {
                updateData.avatar = avatarFile;
            }

            const response = await usersService.updateUser(user.id, updateData);
            if (response.success) {
                setSuccessMessage('Profile updated successfully!');
                setAvatarFile(null); // Clear file input after successful upload
                refreshAuth(); // Refresh user data in context to get new avatar_url
            } else {
                throw new Error(response.message || 'Failed to update profile');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during profile update.');
        } finally {
            setProfileSubmitting(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setPasswordSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!user || !user.id) {
            setError('User not found.');
            setPasswordSubmitting(false);
            return;
        }

        if(formData.new_password === '') {
            setError('New password cannot be empty.');
            setPasswordSubmitting(false);
            return;
        }

        if (formData.new_password.length < 8) {
            setError('New password must be at least 8 characters long.');
            setPasswordSubmitting(false);
            return;
        }
        if (formData.new_password !== formData.confirm_new_password) {
            setError('New passwords do not match.');
            setPasswordSubmitting(false);
            return;
        }

        try {
            const updateData = {
                password: formData.new_password,
            };

            const response = await usersService.updateUser(user.id, updateData);
            if (response.success) {
                setSuccessMessage('Password updated successfully!');
                setFormData(prev => ({
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
            setPasswordSubmitting(false);
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
                                <ImageUploadInput
                                    label="Profile Avatar"
                                    name="avatar"
                                    onChange={handleFileChange}
                                    currentImageUrl={user?.avatar_url ? `${import.meta.env.VITE_API_URL}/${user.avatar_url}` : null}
                                    smallText="Upload a new avatar to replace the current one."
                                />
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
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <div className="input-icon">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="Your phone number"
                                        />
                                        <span className="input-icon-addon">
                                            <IconPhone />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <div className="input-icon">
                                        <textarea
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Your shipping address"
                                            rows="3"
                                        ></textarea>
                                        <span className="input-icon-addon" style={{alignSelf: 'flex-start', paddingTop: '0.75rem'}}>
                                            <IconHome />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button type="submit" className="btn btn-primary" disabled={profileSubmitting}>
                                    {profileSubmitting ? 'Updating...' : 'Update Profile'}
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
                                        />
                                        <span className="input-icon-addon">
                                            <IconKey />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button type="submit" className="btn btn-primary" disabled={passwordSubmitting}>
                                    {passwordSubmitting ? 'Updating...' : 'Change Password'}
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

