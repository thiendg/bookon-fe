import { Link } from "react-router-dom";

const BaseFooter = ({ settingData, categories, recommendations, ...props }) => {

    return <div className="absolute w-full h-max max-h-60 bg-[#C0D6D1] grid grid-cols-12" {...props}>
        <div className="col-span-4 py-4 px-10">
            <div className="flex justify-start items-center">
                <Link to="/" className="text-2xl font-bold flex items-center text-black gap-x-2 no-underline!">
                    <img src="/bookon-logo.png" className="max-w-30" />
                    {settingData.siteName}
                </Link>
            </div>
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
        <div className="col-span-2 py-6 space-y-2">
            <div className="font-bold">Category</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.slug}`}>{category.name}</Link>
                ))}
                <Link to="/category">More...</Link>
            </div>
        </div>
        <div className="col-span-2 py-6 space-y-2 pr-3">
            <div className="font-bold">Recommendations</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                {recommendations.map((recommendation, index) => (
                    <Link key={index} to={`/recommendations/${recommendation.slug}`} className="w-full truncate">{recommendation.title}</Link>
                ))}
                <Link to="/recommendations">More...</Link>
            </div>
        </div>
        <div className="col-span-2 py-6 space-y-2">
            <div className="font-bold">Support</div>
            <div className="space-y-0.5 *:block *:hover:underline *:cursor-pointer *:hover:text-teal-700">
                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact us</Link>
            </div>
        </div>
        <div className="col-span-2 py-6 space-y-2">
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