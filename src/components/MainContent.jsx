// bookon-fe/src/components/MainContent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.hook';
import { useViewMode } from '@/context/ViewModeContext';
import { useSettings } from '@/context/SettingsContext';

import CustomerHeader from './Header'; // This is the file that was Header.jsx
import AdminHeader from './AdminHeader';

const MainContent = ({ children }) => {

  const location = useLocation();

  const { user, loading: authLoading } = useAuth(); // Destructure loading as authLoading to avoid conflict

  const { isCustomerView, toggleViewMode } = useViewMode();

  const settingData = useSettings();



  console.log('MainContent: Rendered');

  console.log('MainContent: location.pathname', location.pathname);

  console.log('MainContent: user', user, 'authLoading', authLoading);



  const isAdmin = user && user.role_id === 1;

  console.log('MainContent: isAdmin (derived)', isAdmin);



  // Paths where no header should be shown (e.g., auth pages)

  const noHeaderPaths = [

    '/login',

    '/register',

    '/forgot-password',

    '/reset-password',

    '/verify-email',

  ];



  // Determine which header to show

  const showAdminHeader = isAdmin && location.pathname.startsWith('/admin');

  const showCustomerHeader = !showAdminHeader && !noHeaderPaths.includes(location.pathname);



  console.log('MainContent: showAdminHeader', showAdminHeader);

  console.log('MainContent: showCustomerHeader', showCustomerHeader);



  if (!settingData) {

    console.log('MainContent: Settings not loaded, returning null.');

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
