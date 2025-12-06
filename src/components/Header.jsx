import { useAuth } from "@/hooks/useAuth.hook";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const pageClass = (currentPage, pageKey) => {
    if (currentPage === pageKey)
        return "rounded-4xl bg-[#399d78] py-2 px-4 cursor-default text-teal-50! no-underline!";
    return "cursor-pointer hover:bg-[#399d78] hover:text-teal-50! rounded-4xl py-2 px-4 text-teal-700! no-underline!";
}

const BaseHeader = ({ currentPage, settingData, ...props }) => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        setDropdownOpen(false);
        navigate('/login');
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
    return <header className="sticky z-50 top-0 bg-linear-to-r bg-white/97 shadow-2xs" {...props}>
        {settingData.adBanner && <div className="bg-[#52786F] h-max w-full text-white text-center font-semibold text-shadow-2xs py-2">
            {settingData.adBanner}
        </div>}
        <nav className="grid grid-cols-12 min-h-15 w-full">
            <div className="col-span-2 flex justify-end items-center px-10 py-4">
                <Link to="/" className="text-2xl font-bold flex items-center text-teal-900! gap-x-2 font-[Verdana,Geneva,sans-serif]">
                    <img src={settingData.logoUrl || '/bookon-logo.png'} className="max-w-30" />
                    {settingData.siteName}
                </Link>
            </div>

            <div className="col-span-7 max-w-550 gap-x-12 flex justify-center items-center font-semibold text-shadow-2xs">
                <Link className={pageClass(currentPage, "home")} to="/">Home</Link>
                <Link className={pageClass(currentPage, "category")} to="/categories">Category</Link>
                <Link className={pageClass(currentPage, "posts")} to="/posts">Posts</Link>
                <Link className={pageClass(currentPage, "recommendations")} to="/recommendations">Recommendations</Link>
                <Link className={pageClass(currentPage, "about")} to="/about">About</Link>
                <Link className={pageClass(currentPage, "faq")} to="/faqs">FAQ</Link>
            </div>

            <div className="col-span-3 h-full flex justify-end items-center gap-x-2 pr-10">
                <Link to="/contact" className={pageClass(currentPage, "contact")}>
                    <img src="/contact.png" className="max-w-8" />
                </Link>
                <Link to="/cart" className={pageClass(currentPage, "cart")}>
                    <img src="/shopping-cart.png" className="max-w-8" />
                </Link>

                <div className="relative flex gap-x-2 rounded-4xlpy-2 px-4 cursor-pointer items-center">
                    {isAuthenticated ? <>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-2 rounded-full bg-[#05EAC0] hover:bg-[#5fe1c9] focus:outline-none">
                            <span className="font-semibold text-sm text-gray-700 hidden sm:block">{user?.full_name || 'User'}</span>
                            <img src={user?.avatar_url || '/user-avatar.png'} alt="User Avatar" className="h-8 w-8 rounded-full" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1 border border-gray-200">
                                <div className="px-2 py-2 text-sm text-gray-700 border-b">
                                    Signed in as <br />
                                    <strong className="truncate">{user?.email}</strong>
                                </div>
                                {isAdmin && (
                                    <Link to="/admin" className="flex items-center w-full text-left px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-gray-100">
                                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                        Admin
                                    </Link>
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
                    </> :
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-[#2C5F2D]! rounded-lg hover:bg-teal-100 no-underline!">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-[#399d78] text-white rounded-lg no-underline! hover:bg-[#65c29f]">
                                Register
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    </header>;
}

export default BaseHeader;