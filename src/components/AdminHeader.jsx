import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.hook";
import { useViewMode } from "@/context/ViewModeContext";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserGroupIcon, Bars3Icon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline'; // Added HomeIcon

const pageClass = (currentPage, pageKey) => {
    if (currentPage === pageKey)
        return "rounded-4xl bg-[#399d78] py-2 px-4 cursor-default text-teal-50! no-underline!";
    return "cursor-pointer hover:bg-[#399d78] hover:text-teal-50! rounded-4xl py-2 px-4 text-teal-700! no-underline!";
}

const AdminHeader = ({ currentPage, settingData, ...props }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { toggleViewMode, isAdmin } = useViewMode(); // Get toggleViewMode and isAdmin from ViewModeContext
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    const handleSwitchToCustomerView = () => {
        if (isAdmin) {
            toggleViewMode(); // Toggle the view mode
            navigate('/'); // Navigate to the customer homepage
        }
    };

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

    return (
        <header className="sticky z-50 top-0 bg-white/97 shadow-2xs" {...props}>
            {settingData.adBanner && (
                <div className="bg-[#52786F] h-max w-full text-white text-center font-semibold text-shadow-2xs py-2">
                    {settingData.adBanner}
                </div>
            )}
            <nav className="flex items-center justify-between px-4 py-3 lg:px-10">
                <div className="flex items-center">
                    <Link to="/admin" className="text-2xl font-bold flex items-center text-teal-900! gap-x-2 font-[Verdana,Geneva,sans-serif]">
                        <img src={settingData.company_logo_url || '/bookon-logo.png'} className="w-8 md:w-8 h-auto object-contain" />
                        <span className="hidden sm:inline">{settingData.siteName} (Admin)</span>
                    </Link>
                </div>

                {/* Admin Navigation Links */}
                <div className="hidden lg:flex lg:gap-x-12 lg:justify-center lg:items-center lg:font-semibold lg:text-shadow-2xs">
                    <Link className={pageClass(currentPage, "dashboard")} to="/admin">Dashboard</Link>
                    <Link className={pageClass(currentPage, "users")} to="/admin/users">Users</Link>
                    <Link className={pageClass(currentPage, "books")} to="/admin/books">Books</Link>
                    <Link className={pageClass(currentPage, "categories")} to="/admin/categories">Categories</Link>
                    <Link className={pageClass(currentPage, "orders")} to="/admin/orders">Orders</Link>
                    <Link className={pageClass(currentPage, "posts")} to="/admin/posts">Posts</Link>
                    {/* Add more admin links as needed */}
                </div>

                <div className="flex items-center gap-x-2">
                    {isAuthenticated && (
                        <div ref={dropdownRef} className="relative flex items-center gap-x-2 cursor-pointer">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-2 rounded-full bg-[#05EAC0] hover:bg-[#5fe1c9] focus:outline-none">
                                <span className="font-semibold text-sm text-gray-700 hidden sm:block">{user?.full_name || 'Admin'}</span>
                                <img src={user?.avatar_url || '/user-avatar.png'} alt="Admin Avatar" className="h-8 w-8 rounded-full" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-xl z-20 py-1 border border-gray-200">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                        Signed in as <br />
                                        <strong className="truncate">{user?.email}</strong>
                                    </div>
                                    {isAdmin && ( // Only show if user is admin
                                        <button onClick={handleSwitchToCustomerView} className="flex items-center w-full text-left px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-100">
                                            <HomeIcon className="h-5 w-5 mr-2" />
                                            Switch to Customer View
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
                        </div>
                    )}
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
                        <Link className={pageClass(currentPage, "dashboard")} to="/admin">Dashboard</Link>
                        <Link className={pageClass(currentPage, "users")} to="/admin/users">Users</Link>
                        <Link className={pageClass(currentPage, "books")} to="/admin/books">Books</Link>
                        <Link className={pageClass(currentPage, "categories")} to="/admin/categories">Categories</Link>
                        <Link className={pageClass(currentPage, "orders")} to="/admin/orders">Orders</Link>
                        <Link className={pageClass(currentPage, "posts")} to="/admin/posts">Posts</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default AdminHeader;