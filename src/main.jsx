import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import './main.css';
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/core/dist/js/tabler.min.js';


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* Wrap App with HelmetProvider */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);