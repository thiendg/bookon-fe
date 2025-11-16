import { useEffect } from "react";
import BaseFooter from "./Footer";
import BaseHeader from "./Header";


export default function BasePage({ title, children, currentPage = "home", ...props }) {
    const settingsData = {
        adBanner: "🎄Xmas coming! New books for Christmas have arrived! 🎄"
    }; // getPage Settings here

    useEffect(() => {
        document.title = title ? `${title} | BookOn` : "BookOn";
    }, [title]);

    return (
        <div className="sticky z-50 w-full h-full bg-linear-to-r from-[#E5FFF9] via-[#FFFFFF] to-[#E5FFF9]" {...props}>
            <BaseHeader
                currentPage={currentPage}
                adBanner={settingsData.adBanner}
            />
            {children}
            <BaseFooter />
        </div>
    );
}