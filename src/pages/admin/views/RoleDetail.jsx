// src/pages/admin/views/RoleDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Keep useNavigate for redirection
import { roleService } from '@/services/role.service';
import { Helmet } from 'react-helmet-async'; // Keep Helmet for page title
import { IconUserShield } from '@tabler/icons-react'; // Keep icons

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import PermissionsSelector from '@/components/admin/PermissionsSelector';


const RoleDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState({}); // { module: [perm1, perm2] }
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchRole = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await roleService.getRoleById(id);
            if (response.success) {
                setRole(response.data);
                setRoleName(response.data.name);
                setSelectedPermissions(response.data.permissions || {});
            } else {
                throw new Error(response.message || 'Failed to fetch role details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching role details.');
            setRole(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRole();
    }, [fetchRole]);

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

    const handleUpdate = async (e) => {
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
            const updateData = {
                name: roleName,
                permissions: permissionsJson
            };
            const response = await roleService.updateRole(id, updateData);
            if (response.success) {
                setSuccessMessage('Role updated successfully!');
                fetchRole(); // Refresh data to ensure consistency
            } else {
                throw new Error(response.message || 'Failed to update role');
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
                    <IconUserShield className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading role details...</p>
            </div>
        );
    }

    if (error && !role) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load role details. <Link to="/admin/roles">Go back to Role List</Link></p>
            </div>
        );
    }

    if (!role) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconUserShield className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Role not found</p>
                <p className="empty-subtitle">The role with ID "{id}" does not exist. <Link to="/admin/roles">Go back to Role List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Role: {role.name} | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Edit Role: ${role.name}`}
                backLink="/admin/roles"
                backLinkText="Back to Roles"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
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
                    disabled={submitting}
                />
            </AdminForm>
        </>
    );
};

export default RoleDetail;
