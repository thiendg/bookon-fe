// src/components/admin/SelectInput.jsx
import React from 'react';

const SelectInput = ({
    label,
    name,
    value,
    onChange,
    options, // Array of { value, label }
    required = false,
    disabled = false,
    loading = false,
    error = false,
    icon: Icon // Expects an Icon component from @tabler/icons-react
}) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {Icon ? (
                <div className="input-icon mb-2">
                    <select
                        className="form-select"
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled || loading || error}
                    >
                        <option value="">
                            {loading ? `Loading ${label.toLowerCase()}...` :
                             error ? `Error loading ${label.toLowerCase()}` :
                             `Select a ${label.toLowerCase()}`}
                        </option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <span className="input-icon-addon">
                        <Icon />
                    </span>
                </div>
            ) : (
                <select
                    className="form-select"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled || loading || error}
                >
                    <option value="">
                        {loading ? `Loading ${label.toLowerCase()}...` :
                         error ? `Error loading ${label.toLowerCase()}` :
                         `Select a ${label.toLowerCase()}`}
                    </option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default SelectInput;
