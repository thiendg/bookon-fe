import { Link } from "react-router-dom";

const BaseFooter = ({ settingData, ...props }) => {

    return (
        <div className="w-full bg-[#C0D6D1] py-8 px-4" {...props}>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:flex-nowrap justify-between text-center md:text-left">
                    {/* Logo and Info */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 text-gray-800">
                        <div className="flex justify-center md:justify-start items-center mb-4">
                            <Link to="/" className="text-2xl font-bold flex items-center text-gray-900 gap-x-2 no-underline!">
                                <img src={settingData.company_logo_url || '/bookon-logo.png'} className="w-16 md:w-16" alt={settingData.siteName} />
                                {settingData.siteName}
                            </Link>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><span className="font-bold">Address</span>: <a href={`https://www.google.com/maps/search/${settingData.address}`} className="hover:underline hover:text-teal-700">{settingData.address}</a></p>
                            <p><span className="font-bold">Phone</span>: {settingData.phone}</p>
                            <p><span className="font-bold">Email</span>: <a href={`mailto:${settingData.email}`} className="hover:underline hover:text-teal-700">{settingData.email}</a></p>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <div className="font-bold mb-2 text-gray-900">Support</div>
                        <div className="space-y-1 flex flex-col text-gray-700">
                            <Link to="/orders" className="hover:underline hover:text-teal-700">Orders</Link>
                            <Link to="/profile" className="hover:underline hover:text-teal-700">Profile</Link>
                            <Link to="/faqs" className="hover:underline hover:text-teal-700">FAQ</Link>
                            <Link to="/contact" className="hover:underline hover:text-teal-700">Contact us</Link>
                        </div>
                    </div>

                    {/* Follow Us Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <div className="font-bold mb-2 text-gray-900">Follow us</div>
                        <div className="space-y-1 flex flex-col text-gray-700">
                            <a href={settingData.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Facebook</a>
                            <a href={settingData.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Twitter</a>
                            <a href={settingData.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-700">Instagram</a>
                        </div>
                    </div>


                </div>
                <div className="font-bold mt-8 pt-8 border-t border-gray-400 text-center text-xs text-gray-700">
                    All Rights Reserved. Copyright ©️ {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
}

export default BaseFooter;