import { Helmet } from "react-helmet-async"; // Import Helmet
import BaseFooter from "./Footer";
import BaseHeader from "./Header";
import { useEffect, useState } from 'react';
import { settingService } from '@/services/setting.service';
import SettingsContext from '@/context/SettingsContext';
import { set } from "date-fns";


export default function BasePage({ title, children, currentPage = "home", ...props }) {
    const [settingsData, setSettingsData] = useState({
        adBanner: "",
        siteName: "BookOn",
        address: "",
        phone: "",
        email: "support@bookon.com",
        facebook: "",
        twitter: "",
        instagram: "",
        company_logo_url: '/bookon-logo.png'
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const resp = await settingService.getAllSettings();
                if (resp.success) {
                    const items = resp.data.data || resp.data || [];
                    const map = {};
                    items.forEach(it => {
                        if (it && it.setting_key) map[it.setting_key] = it.setting_value;
                    });

                    const computed = {
                        adBanner: map.ad_banner || '',
                        siteName: map.company_name || map.site_name || 'BookOn',
                        address: map.company_address || map.address || '',
                        phone: map.company_phone || map.phone || '',
                        email: map.company_email || map.email || 'support@bookon.com',
                        facebook: map.company_facebook || map.facebook || '',
                        twitter: map.company_twitter || map.twitter || '',
                        instagram: map.company_instagram || map.instagram || '',
                        company_logo_url: map.company_logo_url ? `${import.meta.env.VITE_API_URL}/${map.company_logo_url}` : '/bookon-logo.png'
                    };
                    console.log('Loaded settings:', computed);
                    setSettingsData(prev => ({ ...prev, ...computed }));
                }
            } catch (err) {
                // ignore, keep defaults
                console.error('Failed to load settings', err);
            }
        };
        loadSettings();        
        
    }, []);
    const categories = [
        {
            name: "Fantasy",
            slug: 'fantasy'
        },
        {
            name: "Horror",
            slug: 'horror'
        },
        {
            name: "Romance",
            slug: 'romance'
        },
        {
            name: "Sci-Fi",
            slug: 'sci-fi'
        }
    ]; // Fetch from back-end later

    const recommendations = [
        {
            title: "The best book ever",
            slug: "the-best-book-ever"
        },
        {
            title: "Thrilling experience",
            slug: "thrilling-experience"
        },
        {
            title: "No way it is at this reasonable price! I can not believe I can buy my favorite book at this reasonable price!",
            slug: "no-way-it-is-this-reasonable"
        }
    ]; // Fetch from back-end later

    return (
        <div className="sticky z-50 w-full h-full bg-linear-to-r from-[#E5FFF9] via-[#FFFFFF] to-[#E5FFF9]" {...props}>
            <Helmet>
                <title>{title ? `${title} | ${settingsData.siteName}` : `${settingsData.siteName} - Your Online Bookstore`}</title>
                <meta name="description" content="BookOn - Your online bookstore for all genres. Find your next great read with us!" />
            </Helmet>
            <BaseHeader
                currentPage={currentPage}
                settingData={settingsData}
            />
            <SettingsContext.Provider value={settingsData}>
                {children}
            </SettingsContext.Provider>
            <BaseFooter
                settingData={settingsData}
                categories={categories}
                recommendations={recommendations}
            />
        </div>
    );
}