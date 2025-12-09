// src/components/admin/ImageUploadInput.jsx
import React from 'react';
import { IconUpload } from '@tabler/icons-react';

const ImageUploadInput = ({
    label,
    name,
    onChange,
    currentImageUrl,
    required = false,
    smallText
}) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {currentImageUrl && (
                <div className="mb-2">
                    <img src={currentImageUrl} alt="Current" className="img-thumbnail" style={{ maxWidth: '150px' }} />
                </div>
            )}
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    name={name}
                    accept="image/*"
                    onChange={onChange}
                    required={required}
                />
                <span className="input-group-text">
                    <IconUpload />
                </span>
            </div>
            {smallText && <small className="form-text text-muted">{smallText}</small>}
        </div>
    );
};

export default ImageUploadInput;
