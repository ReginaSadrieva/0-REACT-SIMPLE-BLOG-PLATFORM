// ------------------------------------------------------------------
// Purpose: Entry point of the entire React application.
//          Bootstraps the app into the DOM.
//
// What happens here:
//   • Imports global styles (index.scss)
//   • Renders <App /> into #root element
//   • Wrapped in <React.StrictMode> for development warnings and future features
//
// Note: This file should almost never be changed during the project.
// ------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'; // Global styles, fonts, CSS variables
import App from './App'; // Root component with routing

// Find the root element in index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
