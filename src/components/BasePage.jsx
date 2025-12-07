import { Helmet } from "react-helmet-async";
import BaseFooter from "./Footer";
import { useSettings } from '@/context/SettingsContext'; // Import useSettings

export default function BasePage({ title, children, currentPage = "home", ...props }) {
    const settingsData = useSettings(); // Consume settings from context




    return (
        <div className="w-full h-full bg-linear-to-r from-[#E5FFF9] via-[#FFFFFF] to-[#E5FFF9]" {...props}>
            <Helmet>
                <title>{title ? `${title} | ${settingsData.siteName}` : `${settingsData.siteName} - Your Online Bookstore`}</title>
                <meta name="description" content="BookOn - Your online bookstore for all genres. Find your next great read with us!" />
            </Helmet>
            {/* BaseHeader is now handled by MainContent component at the root */}
            {/* Removed: <BaseHeader currentPage={currentPage} settingData={settingsData} /> */}
            
            {children}
            
            <BaseFooter
                settingData={settingsData}
            />
        </div>
    );
}