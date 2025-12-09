// src/pages/admin/views/AdminSettingDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { settingService } from '@/services/setting.service';
import { fileService } from '@/services/file.service';
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
import ImageUploadInput from '@/components/admin/ImageUploadInput';


const AdminSettingDetail = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingSettings, setEditingSettings] = useState({});
    const [fileInputs, setFileInputs] = useState({}); // store File objects for existing settings
    const [newSetting, setNewSetting] = useState({ key: '', value: '', type: 'text' });
    const [newSettingFile, setNewSettingFile] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await settingService.getAllSettings();
            if (response.success) {
                const settingsData = response.data.data || [];
                setSettings(settingsData);
                // Initialize editing state for all settings
                const editState = {};
                settingsData.forEach(setting => {
                    // Use setting_key as the unique identifier (DB may not have numeric id)
                    const key = setting.setting_key;
                    editState[key] = {
                        setting_key: setting.setting_key,
                        setting_value: setting.setting_value,
                        setting_type: setting.setting_type || 'text',
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

    const handleExistingFileChange = (id, file) => {
        setFileInputs(prev => ({ ...prev, [id]: file }));
    };

    const handleUpdateSetting = async (id) => {
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        const settingData = editingSettings[id];
        if (!settingData.setting_key.trim()) {
            setError('Setting key is required.');
            setSubmitting(false);
            return;
        }

        try {
            // If this setting is a file type and a new file has been selected, upload it first
            if (settingData.setting_type === 'file') {
                const file = fileInputs[id];
                if (file) {
                    const uploadResp = await fileService.uploadFile(file, { context: 'setting', key: settingData.setting_key });
                    if (uploadResp.success) {
                        const filePath = uploadResp.data?.file_path || uploadResp.data?.path || uploadResp.data;
                        const payload = {
                            setting_key: settingData.setting_key,
                            setting_value: filePath,
                            setting_type: 'file',
                        };
                        const response = await settingService.updateSetting(id, payload);
                        if (response.success) {
                            setSuccessMessage(`Setting "${settingData.setting_key}" updated successfully!`);
                            fetchSettings();
                            setTimeout(() => setSuccessMessage(''), 3000);
                        } else {
                            throw new Error(response.message || 'Failed to update setting');
                        }
                    } else {
                        throw new Error(uploadResp.message || 'File upload failed');
                    }
                } else {
                    // No new file chosen — update only key/type if changed
                    const payload = {
                        setting_key: settingData.setting_key,
                        setting_value: settingData.setting_value,
                        setting_type: 'file',
                    };
                    const response = await settingService.updateSetting(id, payload);
                    if (response.success) {
                        setSuccessMessage(`Setting "${settingData.setting_key}" updated successfully!`);
                        fetchSettings();
                        setTimeout(() => setSuccessMessage(''), 3000);
                    } else {
                        throw new Error(response.message || 'Failed to update setting');
                    }
                }
            } else {
                // Text setting
                if (!settingData.setting_value || !String(settingData.setting_value).trim()) {
                    setError('Setting value is required.');
                    setSubmitting(false);
                    return;
                }
                const payload = {
                    setting_key: settingData.setting_key,
                    setting_value: settingData.setting_value,
                    setting_type: settingData.setting_type || 'text',
                };
                const response = await settingService.updateSetting(id, payload);
                if (response.success) {
                    setSuccessMessage(`Setting "${settingData.setting_key}" updated successfully!`);
                    fetchSettings();
                    setTimeout(() => setSuccessMessage(''), 3000);
                } else {
                    throw new Error(response.message || 'Failed to update setting');
                }
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
        if (!newSetting.key.trim()) {
            setError('Setting key is required.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            // If new setting is a file type, upload file first
            let payload = {
                setting_key: newSetting.key,
                setting_type: newSetting.type || 'text',
            };

            if (newSetting.type === 'file') {
                if (!newSettingFile) {
                    setError('Please choose a file to upload for this setting.');
                    setSubmitting(false);
                    return;
                }
                const uploadResp = await fileService.uploadFile(newSettingFile, { context: 'setting', key: newSetting.key });
                if (uploadResp.success) {
                    const filePath = uploadResp.data?.file_path || uploadResp.data?.path || uploadResp.data;
                    payload.setting_value = filePath;
                } else {
                    throw new Error(uploadResp.message || 'File upload failed');
                }
            } else {
                if (!newSetting.value.trim()) {
                    setError('Setting value is required.');
                    setSubmitting(false);
                    return;
                }
                payload.setting_value = newSetting.value;
            }

            const response = await settingService.createSetting(payload);
            if (response.success) {
                setSuccessMessage('New setting created successfully!');
                setNewSetting({ key: '', value: '', type: 'text' });
                setNewSettingFile(null);
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
                                                <label className="form-label">Setting Type</label>
                                                <select
                                                    className="form-select"
                                                    value={newSetting.type}
                                                    onChange={(e) => setNewSetting({ ...newSetting, type: e.target.value })}
                                                    disabled={submitting}
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="file">File</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Setting Value</label>
                                                {newSetting.type === 'file' ? (
                                                    <ImageUploadInput
                                                        label="Upload File"
                                                        name="setting_file"
                                                        onChange={(e) => setNewSettingFile(e.target.files?.[0] || null)}
                                                        currentImageUrl={null}
                                                        required={false}
                                                        smallText="Upload a file for this setting."
                                                    />
                                                ) : (
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
                                                )}
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
                                                setNewSetting({ key: '', value: '', type: 'text' });
                                                setNewSettingFile(null);
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
                                        <div key={setting.setting_key} className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <div className="mb-2 mb-md-0">
                                                        <strong>{setting.setting_key}</strong>
                                                        <div className="text-muted small">
                                                            {setting.id ? `ID: ${setting.id}` : `Key: ${setting.setting_key}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    {editingSettings[setting.setting_key]?.setting_type === 'file' ? (
                                                        <ImageUploadInput
                                                            label="Upload File"
                                                            name={`setting_file_${setting.setting_key}`}
                                                            onChange={(e) => handleExistingFileChange(setting.setting_key, e.target.files?.[0] || null)}
                                                            currentImageUrl={setting.setting_value ? `${import.meta.env.VITE_API_URL}/${setting.setting_value}` : null}
                                                            required={false}
                                                            smallText="Upload a new file to replace the current value."
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={editingSettings[setting.setting_key]?.setting_value || ''}
                                                            onChange={(e) =>
                                                                handleSettingChange(
                                                                    setting.setting_key,
                                                                    'setting_value',
                                                                    e.target.value
                                                                )
                                                            }
                                                            disabled={submitting}
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="btn-list justify-content-end">
                                                        <button
                                                            onClick={() => handleUpdateSetting(setting.setting_key)}
                                                            className="btn btn-sm btn-success"
                                                            disabled={submitting}
                                                            title="Save"
                                                        >
                                                            <IconDeviceFloppy className="icon" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSetting(setting.setting_key, setting.setting_key)
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
