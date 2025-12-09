import React from 'react'; // Removed useState and useEffect
import { Outlet, Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext'; // Import useSettings

const AdminLayout = () => {
  const settingsData = useSettings(); // Consume settings from context

  return (
    <div className="page">
      {/* BaseHeader is now handled by MainContent component */}
      {/* Removed: <BaseHeader currentPage="admin" settingData={settingsData} /> */}

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
                      {settingsData?.siteName || 'BookOn Admin'}
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