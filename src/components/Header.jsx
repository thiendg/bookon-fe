import { useAuth } from "@/hooks/useAuth.hook";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { UserCircleIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';


const pageClass = (currentPage, pageKey) => {
    if (currentPage === pageKey)
        return "rounded-lg bg-[#82DECD] py-2 px-4 cursor-default text-gray-800 font-semibold";
    return "cursor-pointer hover:bg-[#a1e9da] rounded-lg py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors duration-200";
}

const BaseHeader = ({ currentPage, adBanner, ...props }) => {
    const { isAuthenticated, user, logout } = useAuth();
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


    return <header className="sticky z-50 top-0 bg-white/80 backdrop-blur-md shadow-sm" {...props}>
        {adBanner && (
            <div className="bg-[#52786F] h-max w-full text-white text-center font-semibold text-xs py-2">
                {adBanner}
            </div>
        )}
        <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
                        <img src="/bookon-logo.png" alt="BookOn Logo" className="h-8 w-auto mr-2" />
                        BookOn
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-2">
                    <Link className={pageClass(currentPage, "home")} to="/dashboard">Home</Link>
                    <Link className={pageClass(currentPage, "category")} to="/category">Category</Link>
                    <Link className={pageClass(currentPage, "recommendations")} to="/recommendations">Recommendations</Link>
                    <Link className={pageClass(currentPage, "about")} to="/about">About</Link>
                    <Link className={pageClass(currentPage, "faq")} to="/faq">FAQ</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/contact" className="p-2 rounded-full hover:bg-gray-200">
                        <img src="/contact.png" alt="Contact" className="h-6 w-6" />
                    </Link>
                    <Link to="/cart" className="p-2 rounded-full hover:bg-gray-200">
                        <img src="/shopping-cart.png" alt="Shopping Cart" className="h-6 w-6" />
                    </Link>

                    <div className="relative" ref={dropdownRef}>
                        {isAuthenticated ? (
                            <>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
                                    <span className="font-semibold text-sm text-gray-700 hidden sm:block">{user?.full_name || 'User'}</span>
                                    <img src={user?.avatar_url || '/user-avatar.png'} alt="User Avatar" className="h-8 w-8 rounded-full" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1 border border-gray-200">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            Signed in as <br />
                                            <strong className="truncate">{user?.email}</strong>
                                        </div>
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
                            <div className="flex items-center space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    </header>;
}

export default BaseHeader;