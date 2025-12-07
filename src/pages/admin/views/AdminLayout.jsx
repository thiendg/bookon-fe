import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import BaseHeader from '@/components/Header';
import { settingService } from '@/services/setting.service';

const AdminLayout = () => {
  const [settingsData, setSettingsData] = useState({
    company_logo_url: '/bookon-logo.png',
    siteName: 'BookOn',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const resp = await settingService.getAllSettings();
        if (resp && resp.success) {
          const items = resp.data.posts || resp.data || [];
          const map = {};
          items.forEach(it => { if (it && it.setting_key) map[it.setting_key] = it.setting_value; });

          const built = {
            siteName: map.company_name || 'BookOn',
            company_logo_url: map.company_logo_url ? `${import.meta.env.VITE_API_URL}${map.company_logo_url}` : '/bookon-logo.png',
            address: map.company_address || '',
            phone: map.company_phone || '',
            email: map.company_email || '',
            adBanner: map.ad_banner || '',
            googleMapsIframe: map.google_maps_iframe || '',
          };
          setSettingsData(built);
        }
      } catch (err) {
        // ignore and keep defaults
      }
    };
    loadSettings();
  }, []);

  return (
    <div className="page">
      <BaseHeader currentPage="admin" settingData={settingsData} />

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