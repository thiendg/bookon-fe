import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';
import { useSettings } from '@/context/SettingsContext';

import CustomerHeader from './Header';
import AdminHeader from './AdminHeader';

const MainContent = ({ children }) => {

  const location = useLocation();

  const { user } = useAuth();

  const settingData = useSettings();
  const isAdmin = user && user.role_id === 1;

  const noHeaderPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',

  ];
  const showAdminHeader = isAdmin && location.pathname.startsWith('/admin');
  const showCustomerHeader = !showAdminHeader && !noHeaderPaths.includes(location.pathname);

  if (!settingData) {
    return null;
  }

  return (
    <>
      {showAdminHeader && <AdminHeader settingData={settingData} currentPage={location.pathname} />}
      {showCustomerHeader && <CustomerHeader settingData={settingData} currentPage={location.pathname} />}
      {children}
    </>
  );
};

export default MainContent;
