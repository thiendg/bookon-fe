// src/pages/admin/views/SessionsList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { sessionService } from '@/services/session.service';
import { Helmet } from 'react-helmet-async';
import {
    IconDeviceDesktop,
    IconDeviceMobile,
    IconTrash,
    IconRefresh,
    IconCircleCheck,
    IconClock,
    IconWorldWww,
} from '@tabler/icons-react';

const SessionsList = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await sessionService.getAllSessions();
            if (response.success) {
                setSessions(response.data || []);
            } else {
                throw new Error(response.message || 'Failed to fetch sessions');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching sessions.');
            setSessions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const handleDeleteSession = async (sessionId) => {
        if (!window.confirm('Are you sure you want to terminate this session?')) {
            return;
        }

        try {
            const response = await sessionService.deleteSession(sessionId);
            if (response.success) {
                setSuccessMessage('Session terminated successfully!');
                fetchSessions();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(response.message || 'Failed to delete session');
            }
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to delete session'));
        }
    };

    const handleLogoutAllOthers = async () => {
        if (!window.confirm('Are you sure you want to logout all other sessions?')) {
            return;
        }

        try {
            const response = await sessionService.logoutAllOtherSessions();
            if (response.success) {
                setSuccessMessage('All other sessions terminated successfully!');
                fetchSessions();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(response.message || 'Failed to logout other sessions');
            }
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to logout other sessions'));
        }
    };

    const getDeviceIcon = (userAgent) => {
        if (!userAgent) return <IconDeviceDesktop className="icon" />;
        const ua = userAgent.toLowerCase();
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            return <IconDeviceMobile className="icon text-primary" />;
        }
        return <IconDeviceDesktop className="icon text-info" />;
    };

    const formatLastActivity = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return date.toLocaleString();
    };

    return (
        <>
            <Helmet>
                <title>Sessions Management | Admin - BookOn</title>
            </Helmet>

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">Active Sessions</h2>
                            <div className="text-muted mt-1">Manage active user sessions</div>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <button onClick={fetchSessions} className="btn btn-icon btn-white">
                                    <IconRefresh className="icon" />
                                </button>
                                <button onClick={handleLogoutAllOthers} className="btn btn-danger">
                                    Logout All Other Sessions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    {successMessage && (
                        <div className="alert alert-success alert-dismissible" role="alert">
                            <div className="d-flex">
                                <IconCircleCheck className="icon alert-icon" />
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
                                <div>Error: {error}</div>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError('')}
                            ></button>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : sessions.length === 0 ? (
                                <div className="empty">
                                    <div className="empty-img">
                                        <IconDeviceDesktop style={{ width: '4rem', height: '4rem' }} />
                                    </div>
                                    <p className="empty-title">No active sessions</p>
                                    <p className="empty-subtitle text-muted">
                                        There are currently no active sessions.
                                    </p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-vcenter card-table">
                                        <thead>
                                            <tr>
                                                <th>Device</th>
                                                <th>User</th>
                                                <th>IP Address</th>
                                                <th>Location</th>
                                                <th>Last Activity</th>
                                                <th>Status</th>
                                                <th className="w-1">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessions.map((session) => (
                                                <tr key={session.session_id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {getDeviceIcon(session.user_agent)}
                                                            <div className="ms-2">
                                                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                                                    {session.user_agent || 'Unknown'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>{session.user_email || session.user_name || `User #${session.user_id}`}</div>
                                                        <div className="text-muted small">ID: {session.user_id}</div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <IconWorldWww className="icon me-2 text-muted" />
                                                            {session.ip_address || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td>{session.location || 'Unknown'}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <IconClock className="icon me-2 text-muted" />
                                                            {formatLastActivity(session.last_activity)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {session.is_current ? (
                                                            <span className="badge bg-success">Current</span>
                                                        ) : (
                                                            <span className="badge bg-info">Active</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {!session.is_current && (
                                                            <button
                                                                onClick={() => handleDeleteSession(session.session_id)}
                                                                className="btn btn-sm btn-icon btn-ghost-danger"
                                                                title="Terminate Session"
                                                            >
                                                                <IconTrash className="icon" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SessionsList;
