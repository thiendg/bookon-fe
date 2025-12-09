// src/pages/admin/views/UserDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { usersService } from '@/services/users.service';
import { roleService } from '@/services/role.service'; // Import roleService
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconUser, IconMail, IconKey } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';


const UserDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [roles, setRoles] = useState([]); // State for dynamically fetched roles
    const [rolesLoading, setRolesLoading] = useState(true);
    const [rolesError, setRolesError] = useState('');

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await usersService.getUserById(id);
            if (response.success) {
                setUser(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch user details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching user details.');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        const fetchRoles = async () => {
            setRolesLoading(true);
            setRolesError('');
            try {
                const response = await roleService.getRoles({ action: 'select' });
                if (response.success) {
                    setRoles(response.data || []);
                } else {
                    throw new Error(response.message || 'Failed to fetch roles');
                }
            } catch (err) {
                setRolesError(err.message || 'Error loading roles.');
                setRoles([]);
            } finally {
                setRolesLoading(false);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!user) {
            setError('No user data to update.');
            setSubmitting(false);
            return;
        }

        try {
            // Prepare data for update. Only send fields that are editable.
            const updateData = {
                full_name: user.full_name,
                email: user.email,
                role_id: user.role_id,
                status: user.status,
                // Do not send password_hash or other sensitive/unupdatable fields
            };
            const response = await usersService.updateUser(id, updateData);
            if (response.success) {
                setSuccessMessage('User updated successfully!');
                // Optionally refetch user data to ensure UI is up-to-date
                // fetchUser(); 
            } else {
                throw new Error(response.message || 'Failed to update user');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during update.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconUser className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading user details...</p>
            </div>
        );
    }

    if (error && !user) { // Only show error if user is null (failed to fetch initially)
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load user details. <Link to="/admin/users">Go back to User List</Link></p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconUser className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">User not found</p>
                <p className="empty-subtitle">The user with ID "{id}" does not exist. <Link to="/admin/users">Go back to User List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`Edit User: ${user?.full_name || 'User'} | Admin - BookOn`}</title>
            </Helmet>
            <AdminForm
                title={`Edit User: ${user.full_name}`}
                backLink="/admin/users"
                backLinkText="Back to Users"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Full Name"
                    name="full_name"
                    value={user.full_name || ''}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    icon={IconUser}
                />
                <TextInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={user.email || ''}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    icon={IconMail}
                />
                <SelectInput
                    label="Role"
                    name="role_id"
                    value={user.role_id || ''}
                    onChange={handleChange}
                    options={roles}
                    required
                    disabled={rolesLoading || rolesError}
                    loading={rolesLoading}
                    error={rolesError}
                    icon={IconKey}
                />
                <SelectInput
                    label="Status"
                    name="status"
                    value={user.status || ''}
                    onChange={handleChange}
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'unverified', label: 'Unverified' }
                    ]}
                    required
                />
            </AdminForm>
        </>
    );
};

export default UserDetail;
