// src/pages/admin/views/UserCreate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { usersService } from '@/services/users.service';
import { roleService } from '@/services/role.service'; // Import roleService
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconUserPlus, IconMail, IconKey } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';

const UserCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role_id: '', // Default to empty or a specific role_id
        status: 'active', // Default status
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [roles, setRoles] = useState([]); // State for dynamically fetched roles
    const [rolesLoading, setRolesLoading] = useState(true);
    const [rolesError, setRolesError] = useState('');

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
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setSubmitting(false);
            return;
        }
        if (!formData.role_id) {
            setError('Please select a role.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await usersService.createUser(formData);
            if (response.success) {
                setSuccessMessage('User created successfully!');
                setFormData({ // Clear form
                    full_name: '',
                    email: '',
                    password: '',
                    role_id: '',
                    status: 'active',
                });
                setTimeout(() => navigate('/admin/users'), 1500); // Redirect after success
            } else {
                throw new Error(response.message || 'Failed to create user');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during creation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Create New User | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New User"
                backLink="/admin/users"
                backLinkText="Back to Users"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create User"
            >
                <TextInput
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    icon={IconUserPlus} // Pass IconUserPlus as icon prop
                />
                <TextInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    icon={IconMail} // Pass IconMail as icon prop
                />
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password (min 8 characters)"
                    required
                    min={8}
                    icon={IconKey} // Pass IconKey as icon prop
                />
                <SelectInput
                    label="Role"
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleChange}
                    options={roles}
                    required
                    disabled={rolesLoading || rolesError}
                    loading={rolesLoading}
                    error={rolesError}
                    icon={IconKey} // Pass IconKey as icon prop
                />
                <SelectInput
                    label="Status"
                    name="status"
                    value={formData.status}
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

export default UserCreate;
