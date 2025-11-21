// src/pages/admin/views/AdminContactDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contactService } from '@/services/contact.service';
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconMail,
    IconUser,
    IconMessage,
    IconCheck,
    IconX,
    IconSend
} from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';
import SelectInput from '@/components/admin/SelectInput';


const AdminContactDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [status, setStatus] = useState('');

    const CONTACT_STATUS_OPTIONS = [
        { value: 'pending', label: 'Pending' },
        { value: 'read', label: 'Read' },
        { value: 'responded', label: 'Responded' },
    ];

    const fetchContact = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await contactService.getContactById(id);
            if (response.success) {
                setContact(response.data);
                setStatus(response.data.status);
            } else {
                throw new Error(response.message || 'Failed to fetch contact details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching contact details.');
            setContact(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchContact();
    }, [fetchContact]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!contact || !id) {
            setError('Contact data not found.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                status: status,
                // Add fields for response message, etc., if needed
            };
            const response = await contactService.updateContact(id, updateData);
            if (response.success) {
                setSuccessMessage('Contact status updated successfully!');
                fetchContact(); // Refresh data
            } else {
                throw new Error(response.message || 'Failed to update contact');
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
                    <IconMail className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading contact details...</p>
            </div>
        );
    }

    if (error && !contact) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load contact details. <Link to="/admin/contacts">Go back to Contact List</Link></p>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconMail className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Contact not found</p>
                <p className="empty-subtitle">The contact with ID "{id}" does not exist. <Link to="/admin/contacts">Go back to Contact List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Contact #{contact.id} Details | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Contact Message #${contact.id}`}
                backLink="/admin/contacts"
                backLinkText="Back to Contacts"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Update Status"
            >
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Message:</strong> {contact.message}</p>
                <p><strong>Received At:</strong> {new Date(contact.created_at * 1000).toLocaleString()}</p>
                <SelectInput
                    label="Status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={CONTACT_STATUS_OPTIONS}
                    required
                    icon={IconMailOpened}
                />
            </AdminForm>
        </>
    );
};

export default AdminContactDetail;
