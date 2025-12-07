import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import AdminSidebarComponent from '@/components/admin/AdminSidebarComponent';
import { settingService } from '@/services/setting.service';
import { useAuth } from '@/hooks/useAuth.hook';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [logoUrl, setLogoUrl] = useState('/bookon-logo.png');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const resp = await settingService.getAllSettings();
        if (resp && resp.success) {
          const items = resp.data.posts || resp.data || [];
          const map = {};
          items.forEach(it => { if (it && it.setting_key) map[it.setting_key] = it.setting_value; });
          if (map.company_logo_url) setLogoUrl(`${import.meta.env.VITE_API_URL}${map.company_logo_url}`);
        }
      } catch (err) {
        // ignore and keep default logo
      }
    };
    loadLogo();
  }, []);

  return (
    <div className="page">
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbar-menu"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <Link to="/admin" aria-label="BookOn Admin">
              <img
                src={logoUrl}
                width="110"
                height="32"
                alt="BookOn"
                className="navbar-brand-image"
              />
            </Link>
          </div>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link d-flex lh-1 p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span className="avatar avatar-sm" style={{ backgroundImage: `url(${user?.avatar_url || '/user-avatar.png'})` }}></span>
                <div className="d-none d-xl-block ps-2">
                  <div>{user?.full_name || 'Admin User'}</div>
                  <div className="mt-1 small text-secondary">{user?.email}</div>
                </div>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <Link to="/admin/profile" className="dropdown-item">Profile</Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
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