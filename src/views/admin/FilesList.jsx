// src/pages/admin/views/FilesList.jsx
import React, { useState } from 'react';
import { fileService } from '@/services/file.service';
import { Helmet } from 'react-helmet-async';
import { IconUpload, IconFile } from '@tabler/icons-react';

const FilesList = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [uploadResult, setUploadResult] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        setUploadResult(null);

        try {
            const response = await fileService.uploadFile(file);
            if (response && response.success) {
                setUploadResult(response.data || null);
                event.target.value = '';
            } else {
                throw new Error(response?.message || 'Upload failed');
            }
        } catch (err) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Files Management | Admin - BookOn</title>
            </Helmet>

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">Files Management</h2>
                            <div className="text-muted mt-1">Upload files (images, attachments)</div>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            <label className="btn btn-primary">
                                <IconUpload className="icon" /> Upload File
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    {error && (
                        <div className="alert alert-danger" role="alert">Error: {error}</div>
                    )}

                    {uploading && (
                        <div className="text-center py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Uploading...</span>
                            </div>
                            <p className="mt-2">Uploading file...</p>
                        </div>
                    )}

                    {uploadResult ? (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Upload Success</h4>
                                <p className="mb-1">{uploadResult.file_path ? (
                                    <a href={uploadResult.file_path} target="_blank" rel="noreferrer">Open uploaded file</a>
                                ) : 'No file URL returned.'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-body text-center text-muted">
                                <IconFile style={{ width: '4rem', height: '4rem' }} />
                                <p className="mt-2">No recent uploads. Use the button above to upload a file.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FilesList;
