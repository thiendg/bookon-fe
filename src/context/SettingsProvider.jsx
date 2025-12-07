import React, { useState, useEffect } from 'react';
import { settingService } from '../services/setting.service'; // Import the settingService
import { SettingsContext, useSettings } from './SettingsContext'; // Import from dedicated context file

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingService.getAllSettings();
                const formattedSettings = response.data.data.reduce((acc, setting) => {
                    acc[setting.setting_key] = setting.setting_value;
                    return acc;
                }, {});
                setSettings(formattedSettings);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, error }}>
            {children}
        </SettingsContext.Provider>
    );
};

