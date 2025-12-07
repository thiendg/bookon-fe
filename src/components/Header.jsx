import { useAuth } from "@/hooks/useAuth.hook";
import { useViewMode } from "@/context/ViewModeContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, ShieldCheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const pageClass = (currentPage, pageKey) => {
    if (currentPage === pageKey)
        return "rounded-4xl bg-[#399d78] py-2 px-4 cursor-default text-teal-50! no-underline!";
    return "cursor-pointer hover:bg-[#399d78] hover:text-teal-50! rounded-4xl py-2 px-4 text-teal-700! no-underline!";
}

const CustomerHeader = ({ currentPage, settingData, ...props }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { toggleViewMode, isAdmin } = useViewMode();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = async () => {
        await logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    const handleSwitchToAdminView = () => {
        if (isAdmin) {
            toggleViewMode();
            navigate('/admin');
        }
    };

    // If settings are still loading, render a minimal header or null
    if (settingData.loading || settingData.error) {
        // You might want to render a very basic header or a loading spinner here
        // For now, let's render a basic structure or null if absolutely no data is available
        return (
            <header className="sticky z-50 top-0 bg-white/97 shadow-2xs" {...props}>
                <nav className="flex items-center justify-between px-4 py-3 lg:px-10">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold flex items-center text-teal-900! gap-x-2 font-[Verdana,Geneva,sans-serif]">
                            <img src="/bookon-logo.png" className="w-8 md:w-8 h-auto object-contain" alt="Loading" />
                            <span className="hidden sm:inline">Loading...</span>
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header className="sticky z-50 top-0 bg-white/97 shadow-2xs" {...props}>
            {settingData.settings.adBanner && (
                <div className="bg-[#52786F] h-max w-full text-white text-center font-semibold text-shadow-2xs py-2">
                    {settingData.settings.adBanner}
                </div>
            )}
            <nav className="flex items-center justify-between px-4 py-3 lg:px-10">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center text-teal-900! gap-x-2 font-[Verdana,Geneva,sans-serif]">
                        <img src={settingData.settings.company_logo_url ? `${import.meta.env.VITE_API_URL}/${settingData.settings.company_logo_url}` : '/bookon-logo.png'} className="w-8 md:w-8 h-auto object-contain" />
                        <span className="hidden sm:inline">{settingData.settings.company_name}</span>
                    </Link>
                </div>

                <div className="hidden lg:flex lg:gap-x-12 lg:justify-center lg:items-center lg:font-semibold lg:text-shadow-2xs">
                    <Link className={pageClass(currentPage, "home")} to="/">Home</Link>
                    <Link className={pageClass(currentPage, "posts")} to="/posts">Posts</Link>
                    <Link className={pageClass(currentPage, "about")} to="/about">About</Link>
                    <Link className={pageClass(currentPage, "faq")} to="/faqs">FAQ</Link>
                </div>

                <div className="flex items-center gap-x-2">
                    <Link to="/contact" className={`${pageClass(currentPage, "contact")} hidden sm:block`}>
                        <img src="/contact.png" className="max-w-8" />
                    </Link>
                    <Link to="/cart" className={pageClass(currentPage, "cart")}>
                        <img src="/shopping-cart.png" className="max-w-8" />
                    </Link>

                    <div ref={dropdownRef} className="relative flex items-center gap-x-2 cursor-pointer">
                        {isAuthenticated ? (
                            <>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-2 rounded-full bg-[#05EAC0] hover:bg-[#5fe1c9] focus:outline-none">
                                    <span className="font-semibold text-sm text-gray-700 hidden sm:block">{user?.full_name || 'User'}</span>
                                    <img src={user?.avatar_url ? `${import.meta.env.VITE_API_URL}/${user?.avatar_url}` : '/user-avatar.png'} alt="User Avatar" className="h-4 w-4 rounded-full" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-xl z-20 py-1 border border-gray-200">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            Signed in as <br />
                                            <strong className="truncate">{user?.email}</strong>
                                        </div>
                                        {isAdmin && (
                                            <button onClick={handleSwitchToAdminView} className="flex items-center w-full text-left px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-100">
                                                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                                Switch to Admin View
                                            </button>
                                        )}
                                        <Link to="/profile" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Cog6ToothIcon className="h-5 w-5 mr-2" />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-[#2C5F2D]! rounded-lg hover:bg-teal-100 no-underline!">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-[#399d78] text-white rounded-lg no-underline! hover:bg-[#65c29f]">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link className={pageClass(currentPage, "home")} to="/">Home</Link>

                        <Link className={pageClass(currentPage, "posts")} to="/posts">Posts</Link>

                        <Link className={pageClass(currentPage, "about")} to="/about">About</Link>
                        <Link className={pageClass(currentPage, "faq")} to="/faqs">FAQ</Link>
                    </div>
                    {!isAuthenticated && (
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                Login
                            </Link>
                            <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default CustomerHeader;