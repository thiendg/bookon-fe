import { Link } from "react-router-dom";

const BaseFooter = () => {
    const settingData = {
        address: "HCM University of Technology",
        phone: "0123 456 789",
        email: "support@bookon.com",
        facebook: "www.facebook.com",
        twitter: "www.twitter.com",
        instagram: "www.instagram.com"
    }; // Fetch from back-end later
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

    return <div className="absolute w-full h-50 bg-[#C0D6D1] grid grid-cols-6">
        <div className="col-span-2 py-4 px-10">
            <img src="/bookon-logo.png" className="max-w-130" />
            <div className="mt-2 *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                <span className="font-bold">Address</span> : <a href={`https://www.google.com/maps/search/${settingData.address}}`}>{settingData.address}</a>
                <br />
                <span className="font-bold">Phone</span> : {settingData.phone}
                <br />
                <span className="font-bold">Email</span> : <a href={`mailto:${settingData.email}`}>{settingData.email}</a>
            </div>
            <div className="font-bold mt-4">
                All Right Reserved. Copyright ©️ 2025
            </div>
        </div>
        <div className="col-span-1 py-6 space-y-2">
            <div className="font-bold">Category</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.slug}`}>{category.name}</Link>
                ))}
                <Link to="/category">More...</Link>
            </div>
        </div>
        <div className="col-span-1 py-6 space-y-2 pr-3">
            <div className="font-bold">Recommendations</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                {recommendations.map((recommendation, index) => (
                    <Link key={index} to={`/recommendations/${recommendation.slug}`} className="w-full truncate">{recommendation.title}</Link>
                ))}
                <Link to="/recommendations">More...</Link>
            </div>
        </div>
        <div className="col-span-1 py-6 space-y-2">
            <div className="font-bold">Support</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact us</Link>
            </div>
        </div>
        <div className="col-span-1 py-6 space-y-2">
            <div className="font-bold">Follow us</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                <a href={settingData.facebook}>Facebook</a>
                <a href={settingData.twitter}>Twitter</a>
                <a href={settingData.instagram}>Instagram</a>
            </div>
        </div>
    </div>;
}

export default BaseFooter;