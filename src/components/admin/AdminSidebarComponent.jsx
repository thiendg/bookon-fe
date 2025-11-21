import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  IconHome,
  IconUsers,
  IconBooks,
  IconCategory,
  IconShoppingBag,
  IconMessage,
  IconStar,
  IconSettings,
  IconMail,
  IconQuestionMark,
  IconLogout,
  IconFile,
  IconReceipt,
  IconMessage2,
  IconUserCheck,
  IconClock,
  IconArrowsExchange,
  IconKey,
} from '@tabler/icons-react';
import AdminMenuListItem from './AdminMenuListItem';

const AdminSidebarComponent = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const menuItems = [
    { to: "/admin", icon: IconHome, title: "Dashboard" },
    { to: "/admin/users", icon: IconUsers, title: "Users" },
    { to: "/admin/books", icon: IconBooks, title: "Books" },
    { to: "/admin/categories", icon: IconCategory, title: "Categories" },
    { to: "/admin/orders", icon: IconShoppingBag, title: "Orders" },
    { to: "/admin/reviews", icon: IconStar, title: "Reviews" },
    { to: "/admin/posts", icon: IconMessage, title: "Posts" },
    { to: "/admin/post-comments", icon: IconMessage, title: "Post Comments" },
    { to: "/admin/contacts", icon: IconMail, title: "Contacts" },
    { to: "/admin/faqs", icon: IconQuestionMark, title: "FAQs" },
    { to: "/admin/settings", icon: IconSettings, title: "Settings" },
    { to: "/admin/files", icon: IconFile, title: "Files" },
    { to: "/admin/order-items", icon: IconReceipt, title: "Order Items" },
    { to: "/admin/order-reviews", icon: IconMessage2, title: "Order Reviews" },
    { to: "/admin/roles", icon: IconUserCheck, title: "Roles" },
    { to: "/admin/sessions", icon: IconClock, title: "Sessions" },
    { to: "/admin/transactions", icon: IconArrowsExchange, title: "Transactions" },
    { to: "/admin/user-tokens", icon: IconKey, title: "User Tokens" },
  ];

  return (
    <aside className="navbar navbar-vertical navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Re-introduce toggleNavbar for this component
          aria-controls="navbar-menu"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-menu" style={{ display: isNavbarCollapsed ? 'none' : 'block' }}> {/* Use style for display based on state */}
          <ul className="navbar-nav pt-lg-3">
            {menuItems.map((item) => (
              <AdminMenuListItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                title={item.title}
                activeclassname="active"
              />
            ))}
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <IconLogout />
                </span>
                <span className="nav-link-title">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebarComponent;