// src/pages/admin/views/RoleCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { roleService } from '@/services/role.service';
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconUserShield } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import PermissionsSelector from '@/components/admin/PermissionsSelector';


const RoleCreate = () => {
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState({}); // { module: [perm1, perm2] }
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePermissionChange = (module, permission, isChecked) => {
        setSelectedPermissions(prev => {
            const modulePermissions = prev[module] ? [...prev[module]] : [];
            if (isChecked) {
                if (!modulePermissions.includes(permission)) {
                    modulePermissions.push(permission);
                }
            } else {
                const index = modulePermissions.indexOf(permission);
                if (index > -1) {
                    modulePermissions.splice(index, 1);
                }
            }
            if (modulePermissions.length === 0) {
                const newState = { ...prev };
                delete newState[module];
                return newState;
            }
            return { ...prev, [module]: modulePermissions };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!roleName.trim()) {
            setError('Role name is required.');
            setSubmitting(false);
            return;
        }

        try {
            const permissionsJson = JSON.stringify(selectedPermissions);
            const response = await roleService.createRole({
                name: roleName,
                permissions: permissionsJson
            });
            if (response.success) {
                setSuccessMessage('Role created successfully!');
                setRoleName('');
                setSelectedPermissions({});
                setTimeout(() => navigate('/admin/roles'), 1500);
            } else {
                throw new Error(response.message || 'Failed to create role');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during role creation.');
        }
        finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Create New Role | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New Role"
                backLink="/admin/roles"
                backLinkText="Back to Roles"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create Role"
            >
                <TextInput
                    label="Role Name"
                    name="name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Enter role name"
                    required
                    icon={IconUserShield}
                />
                <PermissionsSelector
                    selectedPermissions={selectedPermissions}
                    onPermissionChange={handlePermissionChange}
                />
            </AdminForm>
        </>
    );
};

export default RoleCreate;
