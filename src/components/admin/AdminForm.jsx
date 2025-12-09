// src/components/admin/AdminForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const AdminForm = ({
    title,
    subtitle,
    backLink,
    backLinkText,
    onSubmit,
    children,
    submitText = 'Save Changes',
    submitting,
    error,
    successMessage
}) => {
    return (
        <div className="container-xl">
            <div className="page-header d-print-none">
                <div className="row align-items-center">
                    <div className="col">
                        {backLink && (
                            <Link to={backLink} className="btn btn-ghost d-none d-sm-inline-block me-3">
                                <IconArrowLeft className="icon" />
                                {backLinkText || 'Back'}
                            </Link>
                        )}
                        <h2 className="page-title">{title}</h2>
                        {subtitle && <div className="page-subtitle">{subtitle}</div>}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <form className="card" onSubmit={onSubmit}>
                    <div className="card-header">
                        <h3 className="card-title">{title}</h3>
                    </div>
                    <div className="card-body">
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {children}
                    </div>
                    <div className="card-footer text-end">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Saving...' : submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminForm;
