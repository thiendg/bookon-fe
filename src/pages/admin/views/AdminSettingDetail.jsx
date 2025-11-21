// src/pages/admin/views/AdminSettingDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { settingService } from '@/services/setting.service';
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconSettings,
    IconKey, // For setting key
    IconEdit, // For setting value
    IconX
} from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';


const AdminSettingDetail = () => {
    // There might not be an ID if we're fetching a global setting without specific ID in URL
    // For now, assume a single settings page. We might need a settings list if there are many unique settings.
    // However, the controller supports getSetting by ID or key.
    const SETTING_ID_OR_KEY = 'site_config'; // Example: Fetch a global site config setting

    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [setting, setSetting] = useState(null);
    const [formData, setFormData] = useState({
        setting_key: '',
        setting_value: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchSetting = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await settingService.getSettingByIdOrKey(SETTING_ID_OR_KEY);
            if (response.success) {
                setSetting(response.data);
                setFormData({
                    setting_key: response.data.setting_key,
                    setting_value: response.data.setting_value,
                });
            } else {
                // If setting not found, maybe allow creation if it's a new global setting
                // For this example, just set error if not found
                throw new Error(response.message || 'Failed to fetch setting details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching setting details.');
            setSetting(null);
        } finally {
            setLoading(false);
        }
    }, [SETTING_ID_OR_KEY]);

    useEffect(() => {
        fetchSetting();
    }, [fetchSetting]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!setting || !SETTING_ID_OR_KEY) {
            setError('No setting data to update.');
            setSubmitting(false);
            return;
        }
        if (!formData.setting_key.trim() || !formData.setting_value.trim()) {
            setError('Setting key and value are required.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                setting_key: formData.setting_key,
                setting_value: formData.setting_value,
            };
            const response = await settingService.updateSetting(SETTING_ID_OR_KEY, updateData);
            if (response.success) {
                setSuccessMessage('Setting updated successfully!');
                fetchSetting(); // Refresh data to ensure consistency
            } else {
                throw new Error(response.message || 'Failed to update setting');
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
                    <IconSettings className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading settings...</p>
            </div>
        );
    }

    if (error && !setting) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load setting details.</p>
            </div>
        );
    }

    if (!setting) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconSettings className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Setting not found</p>
                <p className="empty-subtitle">The setting "{SETTING_ID_OR_KEY}" does not exist. (You may need to create it manually or via another endpoint).</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Setting: {setting.setting_key} | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Edit Setting: ${setting.setting_key}`}
                backLink="/admin" // Link back to admin dashboard
                backLinkText="Back to Home Page"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Setting Key"
                    name="setting_key"
                    value={formData.setting_key}
                    onChange={handleChange}
                    placeholder="Enter setting key"
                    required
                    icon={IconKey}
                />
                <TextInput
                    label="Setting Value"
                    name="setting_value"
                    value={formData.setting_value}
                    onChange={handleChange}
                    placeholder="Enter setting value"
                    required
                    icon={IconEdit}
                />
            </AdminForm>
        </>
    );
};

export default AdminSettingDetail;
