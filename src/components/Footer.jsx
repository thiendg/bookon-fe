import { Link } from "react-router-dom";

const BaseFooter = ({ settingData, ...props }) => {
    // If settings are still loading, render a minimal footer
    if (settingData.loading || settingData.error) {
        return (
            <div className="w-full bg-[#C0D6D1] py-8 px-4" {...props}>
                <div className="container mx-auto text-center text-gray-700">
                    Loading Footer...
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#C0D6D1] py-6 px-4" {...props}>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:flex-nowrap justify-between text-center md:text-left">
                    {/* Logo and Info */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 text-gray-800">
                        <div className="flex justify-center md:justify-start items-center mb-4">
                            <Link to="/" className="text-2xl font-bold flex items-center text-gray-900 gap-x-2 no-underline!">
                                <img src={settingData.settings.company_logo_url ? `${import.meta.env.VITE_API_URL}/${settingData.settings.company_logo_url}` : '/bookon-logo.png'} className="w-8 md:w-8" alt={settingData.settings.company_name} />
                                {settingData.settings.company_name}
                            </Link>
                        </div>
                        <div className="flex flex-col items-center md:items-start text-sm space-y-1">
                            <p className="text-center md:text-left"><span className="font-bold">Address</span>: <a href={`https://www.google.com/maps/search/${settingData.settings.company_address}`} className="hover:underline hover:text-teal-700" target="_blank">
                                {settingData.settings.company_address}
                            </a></p>
                            <p className="text-center md:text-left"><span className="font-bold">Phone</span>: {settingData.settings.company_phone}</p>
                            <p className="text-center md:text-left"><span className="font-bold">Email</span>: <a href={`mailto:${settingData.settings.company_email}`} className="hover:underline hover:text-teal-700">{settingData.settings.company_email}</a></p>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="w-full md:w-1/3 my-6 md:my-0">
                        <div className="font-bold mb-2 text-gray-900">Support</div>
                        <div className="space-y-1 flex flex-col text-gray-700">
                            <Link to="/profile/orders" className="hover:underline hover:text-teal-700">Orders</Link>
                            <Link to="/profile" className="hover:underline hover:text-teal-700">Profile</Link>
                            <Link to="/faqs" className="hover:underline hover:text-teal-700">FAQ</Link>
                            <Link to="/contact" className="hover:underline hover:text-teal-700">Contact us</Link>
                        </div>
                    </div>

                    {/* Follow Us Links */}
                    <div className="w-full md:w-1/3 my-6 md:my-0">
                        <div className="font-bold mb-2 text-gray-900">Follow us</div>
                        <div className="space-y-1 flex flex-col text-gray-700">
                            <a href={settingData.settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Facebook</a>
                            <a href={settingData.settings.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Twitter</a>
                            <a href={settingData.settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Instagram</a>
                        </div>
                    </div>


                </div>
                <div className="font-bold mt-6 pt-6 border-t border-gray-400 text-center text-xs text-gray-700">
                    All Rights Reserved. Copyright ©️ {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
}

export default BaseFooter;