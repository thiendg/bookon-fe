// src/pages/admin/views/AdminSettingDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { settingService } from '@/services/setting.service';
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconSettings,
    IconKey,
    IconEdit,
    IconX,
    IconPlus,
    IconTrash,
    IconCheck,
    IconDeviceFloppy
} from '@tabler/icons-react';

// Import generic components
import TextInput from '@/components/admin/TextInput';


const AdminSettingDetail = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingSettings, setEditingSettings] = useState({});
    const [newSetting, setNewSetting] = useState({ key: '', value: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await settingService.getAllSettings();
            if (response.success) {
                const settingsData = response.data || [];
                setSettings(settingsData);
                // Initialize editing state for all settings
                const editState = {};
                settingsData.forEach(setting => {
                    editState[setting.id] = {
                        setting_key: setting.setting_key,
                        setting_value: setting.setting_value,
                    };
                });
                setEditingSettings(editState);
            } else {
                throw new Error(response.message || 'Failed to fetch settings');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching settings.');
            setSettings([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleSettingChange = (id, field, value) => {
        setEditingSettings(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleUpdateSetting = async (id) => {
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        const settingData = editingSettings[id];
        if (!settingData.setting_key.trim() || !settingData.setting_value.trim()) {
            setError('Setting key and value are required.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await settingService.updateSetting(id, settingData);
            if (response.success) {
                setSuccessMessage(`Setting "${settingData.setting_key}" updated successfully!`);
                fetchSettings();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(response.message || 'Failed to update setting');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during update.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteSetting = async (id, key) => {
        if (!window.confirm(`Are you sure you want to delete setting "${key}"?`)) {
            return;
        }

        try {
            const response = await settingService.deleteSetting(id);
            if (response.success) {
                setSuccessMessage(`Setting "${key}" deleted successfully!`);
                fetchSettings();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(response.message || 'Failed to delete setting');
            }
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to delete setting'));
        }
    };

    const handleAddSetting = async (e) => {
        e.preventDefault();
        if (!newSetting.key.trim() || !newSetting.value.trim()) {
            setError('Both key and value are required for new setting.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await settingService.createSetting({
                setting_key: newSetting.key,
                setting_value: newSetting.value,
            });
            if (response.success) {
                setSuccessMessage('New setting created successfully!');
                setNewSetting({ key: '', value: '' });
                setShowAddForm(false);
                fetchSettings();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(response.message || 'Failed to create setting');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating setting.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Settings Management | Admin - BookOn</title>
            </Helmet>

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">System Settings</h2>
                            <div className="text-muted mt-1">Manage your application settings</div>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="btn btn-primary"
                            >
                                <IconPlus className="icon" />
                                Add New Setting
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    {successMessage && (
                        <div className="alert alert-success alert-dismissible" role="alert">
                            <div className="d-flex">
                                <IconCheck className="icon alert-icon" />
                                <div>{successMessage}</div>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setSuccessMessage('')}
                            ></button>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <div className="d-flex">
                                <IconX className="icon alert-icon" />
                                <div>{error}</div>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError('')}
                            ></button>
                        </div>
                    )}

                    {/* Add New Setting Form */}
                    {showAddForm && (
                        <div className="card mb-3">
                            <div className="card-header">
                                <h3 className="card-title">Add New Setting</h3>
                            </div>
                            <form onSubmit={handleAddSetting}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="mb-3">
                                                <label className="form-label">Setting Key</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="e.g., site_name"
                                                    value={newSetting.key}
                                                    onChange={(e) =>
                                                        setNewSetting({ ...newSetting, key: e.target.value })
                                                    }
                                                    disabled={submitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="mb-3">
                                                <label className="form-label">Setting Value</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter value"
                                                    value={newSetting.value}
                                                    onChange={(e) =>
                                                        setNewSetting({ ...newSetting, value: e.target.value })
                                                    }
                                                    disabled={submitting}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="btn-list">
                                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                                            <IconPlus className="icon" /> Create Setting
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => {
                                                setShowAddForm(false);
                                                setNewSetting({ key: '', value: '' });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Settings List */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">All Settings</h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : settings.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconSettings style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No settings found</p>
                                    <p className="empty-subtitle text-muted">
                                        Click "Add New Setting" to create your first setting.
                                    </p>
                                </div>
                            ) : (
                                <div className="list-group list-group-flush">
                                    {settings.map((setting) => (
                                        <div key={setting.id} className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <div className="mb-2 mb-md-0">
                                                        <strong>{setting.setting_key}</strong>
                                                        <div className="text-muted small">
                                                            ID: {setting.id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editingSettings[setting.id]?.setting_value || ''}
                                                        onChange={(e) =>
                                                            handleSettingChange(
                                                                setting.id,
                                                                'setting_value',
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={submitting}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="btn-list justify-content-end">
                                                        <button
                                                            onClick={() => handleUpdateSetting(setting.id)}
                                                            className="btn btn-sm btn-success"
                                                            disabled={submitting}
                                                            title="Save"
                                                        >
                                                            <IconDeviceFloppy className="icon" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSetting(setting.id, setting.setting_key)
                                                            }
                                                            className="btn btn-sm btn-danger"
                                                            disabled={submitting}
                                                            title="Delete"
                                                        >
                                                            <IconTrash className="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSettingDetail;
