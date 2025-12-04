import { Helmet } from "react-helmet-async"; // Import Helmet
import BaseFooter from "./Footer";
import BaseHeader from "./Header";


export default function BasePage({ title, children, currentPage = "home", ...props }) {
    const settingsData = {
        adBanner: "🎄Xmas coming! New books for Christmas have arrived! 🎄",
        siteName: "BookOn",
        address: "HCM University of Technology",
        phone: "0123 456 789",
        email: "support@bookon.com",
        facebook: "www.facebook.com",
        twitter: "www.twitter.com",
        instagram: "www.instagram.com"
    }; // getPage Settings here

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
                <title>{title ? `${title} | BookOn` : "BookOn - Your Online Bookstore"}</title>
                <meta name="description" content="BookOn - Your online bookstore for all genres. Find your next great read with us!" />
            </Helmet>
            <BaseHeader
                currentPage={currentPage}
                settingData={settingsData}
            />
            {children}
            <BaseFooter
                settingData={settingsData}
                categories={categories}
                recommendations={recommendations}
            />
        </div>
    );
}