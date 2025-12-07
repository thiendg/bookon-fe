import React from 'react';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '@/context/SettingsContext';

const AboutPage = () => {
    const { settings, loading, error } = useSettings();

    if (loading) {
        return <BasePage title="About Us"><div className="container mx-auto px-4 py-8 text-center">Loading About Us content...</div></BasePage>;
    }

    if (error) {
        return <BasePage title="About Us"><div className="container mx-auto px-4 py-8 text-center text-red-500">Error loading About Us content.</div></BasePage>;
    }

    return (
        <BasePage title="About Us">
            <Helmet>
                <meta name="description" content="Learn more about BookOn - Your online bookstore." />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                {settings.about_page_content ? (
                    <div className="prose lg:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: settings.about_page_content }}></div>
                ) : (
                    <div className="text-center text-gray-600">No About Us content available.</div>
                )}
            </div>
        </BasePage>
    );
};

export default AboutPage;
