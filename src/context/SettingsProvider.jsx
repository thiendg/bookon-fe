import React, { useState, useEffect } from 'react';
import { SettingsContext } from './SettingsContext';
import { useAuth } from '../hooks/useAuth.hook'; // Assuming useAuth is here

// This would typically fetch settings from an API
// For now, we'll use dummy data
const fetchSettings = async () => {
    // In a real application, you'd make an API call here, e.g.:
    // const response = await api.get('/settings');
    // return response.data;
    return {
        siteName: 'BookOn',
        company_logo_url: '/bookon-logo.png', // Or a different default
        adBanner: 'Limited Time Offer: 10% off all books!',
        // Add other settings as needed
    };
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSettings = async () => {
            const fetchedSettings = await fetchSettings();
            setSettings(fetchedSettings);
            setLoading(false);
        };
        getSettings();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};
