// src/components/admin/TextInput.jsx
import React from 'react';

const TextInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    required = false,
    icon: Icon, // Expects an Icon component from @tabler/icons-react
    min,
    max,
    step,
    rows // For textarea type
}) => {
    const inputElement = type === 'textarea' ? (
        <textarea
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
        ></textarea>
    ) : (
        <input
            type={type}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            step={step}
        />
    );

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {Icon ? (
                <div className="input-icon">
                    {inputElement}
                    <span className="input-icon-addon">
                        <Icon />
                    </span>
                </div>
            ) : (
                inputElement
            )}
        </div>
    );
};

export default TextInput;
