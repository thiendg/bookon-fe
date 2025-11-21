import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebarComponent from '@/components/admin/AdminSidebarComponent';

const AdminLayout = () => {
  useEffect(() => {
    // Dynamically load Tabler's theme script if not already loaded
    // This part assumes that tabler.min.js (which includes tabler-theme.min.js behavior)
    // is already loaded via main.jsx as per previous step.
    // If not, we might need to load it here or ensure it's loaded globally.
    // For now, assuming core tabler.min.js handles the initial theme setup.

    // Also need to handle dynamic loading of the js for charts and maps
    // These scripts are currently outside React's lifecycle.
    // I'll manage these in AdminDashboardPage.jsx where the charts are actually rendered.
  }, []);

  return (
    <div className="page">
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            // The onClick and aria-expanded are handled by AdminSidebarComponent internally
            aria-controls="navbar-menu"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <Link to="/admin" aria-label="BookOn Admin">
              <img
                src="/bookon-logo.png" // Using the logo from public folder
                width="110"
                height="32"
                alt="BookOn"
                className="navbar-brand-image"
              />
            </Link>
          </div>
          <div className="navbar-nav flex-row order-md-last">
            {/* Dark/Light mode toggle, notifications, app menu - keeping simplified for now */}
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link d-flex lh-1 p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/user-avatar.png)' }}></span> {/* Placeholder avatar */}
                <div className="d-none d-xl-block ps-2">
                  <div>Admin User</div>
                  <div className="mt-1 small text-secondary">Administrator</div>
                </div>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <Link to="/admin/profile" className="dropdown-item">Profile</Link>
                <div className="dropdown-divider"></div>
                <Link to="/logout" className="dropdown-item">Logout</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AdminSidebarComponent />
      <div className="page-wrapper">
        <Outlet />
        <footer className="footer footer-transparent d-print-none">
          <div className="container-xl">
            <div className="row text-center align-items-center flex-row-reverse">
              <div className="col-lg-auto ms-lg-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    <a href="https://tabler.io/docs" target="_blank" className="link-secondary" rel="noopener">
                      Documentation
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/tabler/tabler" target="_blank" className="link-secondary" rel="noopener">
                      Source code
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/sponsors/codecalm" target="_blank" className="link-secondary" rel="noopener">
                      Sponsor
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    Copyright &copy; 2025
                    <Link to="/admin" className="link-secondary">
                      BookOn Admin
                    </Link>
                    . All rights reserved.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;