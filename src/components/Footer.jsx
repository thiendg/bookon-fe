import { Link } from "react-router-dom";

const BaseFooter = ({ settingData, categories, recommendations, ...props }) => {

    return (
        <div className="w-full bg-[#C0D6D1] py-8 px-4" {...props}>
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between text-center md:text-left">
                    {/* Logo and Info */}
                    <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                        <div className="flex justify-center md:justify-start items-center mb-4">
                            <Link to="/" className="text-2xl font-bold flex items-center text-black gap-x-2 no-underline!">
                                <img src={settingData.logoUrl || '/bookon-logo.png'} className="max-w-24 md:max-w-30" />
                                {settingData.siteName}
                            </Link>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><span className="font-bold">Address</span>: <a href={`https://www.google.com/maps/search/${settingData.address}`} className="hover:underline hover:text-teal-700">{settingData.address}</a></p>
                            <p><span className="font-bold">Phone</span>: {settingData.phone}</p>
                            <p><span className="font-bold">Email</span>: <a href={`mailto:${settingData.email}`} className="hover:underline hover:text-teal-700">{settingData.email}</a></p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-wrap justify-between">
                        {/* Category */}
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                            <div className="font-bold mb-2">Category</div>
                            <div className="space-y-1 flex flex-col">
                                {categories.slice(0, 4).map((category, index) => (
                                    <Link key={index} to={`/category/${category.slug}`} className="hover:underline hover:text-teal-700">{category.name}</Link>
                                ))}
                                <Link to="/categories" className="hover:underline hover:text-teal-700">More...</Link>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 mb-6 md:mb-0">
                            <div className="font-bold mb-2">Recommendations</div>
                            <div className="space-y-1 flex flex-col">
                                {recommendations.slice(0, 4).map((recommendation, index) => (
                                    <Link key={index} to={`/recommendations/${recommendation.slug}`} className="truncate hover:underline hover:text-teal-700">{recommendation.title}</Link>
                                ))}
                                <Link to="/recommendations" className="hover:underline hover:text-teal-700">More...</Link>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                            <div className="font-bold mb-2">Support</div>
                            <div className="space-y-1 flex flex-col">
                                <Link to="/orders" className="hover:underline hover:text-teal-700">Orders</Link>
                                <Link to="/profile" className="hover:underline hover:text-teal-700">Profile</Link>
                                <Link to="/faq" className="hover:underline hover:text-teal-700">FAQ</Link>
                                <Link to="/contact" className="hover:underline hover:text-teal-700">Contact us</Link>
                            </div>
                        </div>

                        {/* Follow us */}
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 mt-6 sm:mt-0">
                            <div className="font-bold mb-2">Follow us</div>
                            <div className="space-y-1 flex flex-col">
                                <a href={settingData.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Facebook</a>
                                <a href={settingData.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Twitter</a>
                                <a href={settingData.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-bold mt-8 pt-8 border-t border-gray-400 text-center text-xs">
                    All Rights Reserved. Copyright ©️ {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
}

export default BaseFooter;