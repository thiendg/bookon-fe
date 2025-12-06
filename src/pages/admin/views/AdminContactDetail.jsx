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
    IconSend,
    IconMailOpened
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
    const [replyMessage, setReplyMessage] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

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

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) {
            setError('Please enter a reply message.');
            return;
        }

        setSendingReply(true);
        setError('');
        setSuccessMessage('');

        try {
            // This would typically send an email to the contact's email address
            // For now, we'll update the contact with the reply and change status to "responded"
            const response = await contactService.updateContact(id, {
                status: 'responded',
                reply: replyMessage,
            });
            
            if (response.success) {
                setSuccessMessage('Reply sent successfully!');
                setReplyMessage('');
                fetchContact();
            } else {
                throw new Error(response.message || 'Failed to send reply');
            }
        } finally {
            setSendingReply(false);
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
                    <IconX className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Error</p>
                <p className="empty-subtitle text-muted">{error}</p>
                <div className="empty-action">
                    <Link to="/admin/contacts" className="btn btn-primary">
                        <IconArrowLeft className="icon me-2" />
                        Back to Contacts
                    </Link>
                </div>
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
            </div>
        );
    }

    const receivedAtString = contact && contact.created_at ? new Date(Number(contact.created_at) * 1000).toLocaleString() : 'Unknown';

    return (
        <>
            {contact && (
                <Helmet>
                    <title>{`Contact #${contact.id ?? 'N/A'} Details | Admin - BookOn`}</title>
                </Helmet>
            )}
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
                {/* Contact Information Card */}
                <div className="card mb-3">
                    <div className="card-header">
                        <h3 className="card-title">Contact Information</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-4"><strong>Name:</strong></div>
                            <div className="col-md-8">{contact.name}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4"><strong>Email:</strong></div>
                            <div className="col-md-8">
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4"><strong>Subject:</strong></div>
                            <div className="col-md-8">{contact.subject || 'N/A'}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4"><strong>Received At:</strong></div>
                            <div className="col-md-8">
                                {receivedAtString}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4"><strong>Message:</strong></div>
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        {contact.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Previous Reply (if exists) */}
                {contact.reply && (
                    <div className="card mb-3">
                        <div className="card-header bg-success-lt">
                            <h3 className="card-title text-success">Previous Reply</h3>
                        </div>
                        <div className="card-body">
                            {contact.reply}
                        </div>
                    </div>
                )}

                {/* Status Update */}
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

            {/* Reply Form */}
            {/* Reply Form */}
            <div className="container-xl mt-4">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Send Reply</h3>
                    </div>
                    <form onSubmit={handleSendReply}>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Reply Message</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your reply here..."
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" disabled={sendingReply}>
                                <IconSend className="icon me-2" />
                                {sendingReply ? 'Sending...' : 'Send Reply'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminContactDetail;
