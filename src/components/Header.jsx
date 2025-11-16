import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const pageClass = (currentPage, pageKey) => {
    if (currentPage === pageKey)
        return "rounded-4xl bg-[#82DECD] py-2 px-4 cursor-default";
    return "cursor-pointer hover:bg-[#82DECD] rounded-4xl py-2 px-4";
}

const BaseHeader = ({ currentPage, adBanner, ...props }) => {
    const { isAuthenticated } = useAuth();
    const user = {  // Get user info here
        name: 'User'
    }
    return <div className="sticky z-50 top-0 bg-linear-to-r from-[#E5FFF9] via-[#FFFFFF] to-[#E5FFF9] shadow-2xs" {...props}>
        <div className="bg-[#52786F] h-max w-full text-white text-center font-semibold text-shadow-2xs py-2">
            {adBanner}
        </div>
        <div className="grid grid-cols-4 min-h-15 w-full">
            <div className="col-span-1 justify-items-center px-10 py-4">
                <img src="/bookon-logo.png" className="max-w-30" />
            </div>
            <div className="col-span-2 max-w-550 gap-x-12 flex justify-center items-center font-semibold text-shadow-2xs">
                <Link className={pageClass(currentPage, "home")} to="/home">
                    Home
                </Link>
                <Link className={pageClass(currentPage, "category")} to="/category">
                    Category
                </Link>
                <Link className={pageClass(currentPage, "recommendations")} to="/recommendations">
                    Recommendations
                </Link>
                <Link className={pageClass(currentPage, "about")} to="/about">
                    About
                </Link>
                <Link className={pageClass(currentPage, "faq")} to="/faq">
                    FAQ
                </Link>
            </div>
            <div className="col-span-1 h-full flex justify-end items-center gap-x-2 pr-10">
                <div className={pageClass(currentPage, "contact")}>
                    <img src="/contact.png" className="max-w-8" />
                </div>
                <div className={pageClass(currentPage, "cart")}>
                    <img src="/shopping-cart.png" className="max-w-8" />
                </div>
                <div className="flex gap-x-2 rounded-4xl bg-[#05EAC0] py-2 px-4 cursor-pointer items-center">
                    {isAuthenticated ? <>
                        <span className="font-bold text-white">{user.name}</span>
                        <img src="/user-avatar.png" className="max-w-8" />
                    </> : <>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </>}
                </div>
            </div>
        </div>
    </div>;
}

export default BaseHeader;