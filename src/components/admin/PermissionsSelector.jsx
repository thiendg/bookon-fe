// src/components/admin/PermissionsSelector.jsx
import React from 'react';
import { IconLockAccess } from '@tabler/icons-react';

// Predefined list of all possible permissions in the system
const ALL_PERMISSIONS = {
    users: ['read', 'create', 'update', 'delete'],
    books: ['read', 'create', 'edit', 'delete'],
    categories: ['read', 'manage'], // 'manage' implies create, update, delete
    orders: ['read', 'manage'],
    reviews: ['read', 'manage'],
    roles: ['read', 'create', 'update', 'delete'],
    contacts: ['read', 'manage'],
    faqs: ['read', 'manage'],
    posts: ['read', 'manage'],
    settings: ['read', 'manage'],
    transactions: ['read', 'manage'],
    // Add other modules and their permissions here
};

const PermissionsSelector = ({ selectedPermissions, onPermissionChange, disabled = false }) => {
    return (
        <div className="mb-3">
            <label className="form-label d-block">Permissions</label>
            <div className="border p-3 rounded">
                {Object.entries(ALL_PERMISSIONS).map(([module, perms]) => (
                    <div key={module} className="mb-2">
                        <strong>{module.charAt(0).toUpperCase() + module.slice(1)} Permissions:</strong>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                            {perms.map(permission => (
                                <label key={`${module}-${permission}`} className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedPermissions[module]?.includes(permission) || false}
                                        onChange={(e) => onPermissionChange(module, permission, e.target.checked)}
                                        disabled={disabled}
                                    />
                                    <span className="form-check-label">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Optional: Add a helper text or icon */}
            <small className="form-text text-muted mt-2">
                <IconLockAccess className="icon icon-sm" /> Select the permissions for this role.
            </small>
        </div>
    );
};

export default PermissionsSelector;
