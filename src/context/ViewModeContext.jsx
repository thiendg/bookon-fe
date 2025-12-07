import React, { createContext, useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth.hook'; // Assuming useAuth is here

const ViewModeContext = createContext(null);

export const ViewModeProvider = ({ children }) => {
  const { isAdmin } = useAuth(); // Use isAdmin from AuthContext

  // State to track if the admin is currently viewing the customer interface
  // Default to true for customer view
  const [isCustomerView, setIsCustomerView] = useState(true);

  const toggleViewMode = () => {
    // Only allow toggling if the user is an admin
    if (isAdmin) {
      setIsCustomerView(prev => !prev);
    }
  };

  const value = {
    isCustomerView,
    toggleViewMode,
    isAdmin, // Re-expose isAdmin for convenience in consumers
  };

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
