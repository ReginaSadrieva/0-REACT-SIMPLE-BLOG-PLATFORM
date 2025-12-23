// ------------------------------------------------------------------
// Purpose: Root application component and router configuration.
//          This is the entry point for all routing in the app.
//
// Why we use BrowserRouter here:
//   • Central place for all routes
//   • basename needed for GitHub Pages deployment
//   • Layout is shared across routes (Header + container logic)
//
// Current routes (Phase 1):
//   • /0-REACT-SIMPLE-BLOG-PLATFORM/         → HomePage (with Layout)
//   • /0-REACT-SIMPLE-BLOG-PLATFORM/articles → same as home (requirement)
//   • Future: /articles/:slug                → Article detail page
// ------------------------------------------------------------------

import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import ArticlePage from './pages/ArticlePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SettingsPage from './pages/SettingsPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <BrowserRouter basename="/0-REACT-SIMPLE-BLOG-PLATFORM">
      <Routes>
        {/* All pages use the same Layout (Header + Container wrapper) */}
        <Route path="/" element={<Layout />}>
          {/* Index route = home page */}
          <Route index element={<HomePage />} />

          {/* Additional route from requirements – shows the same home page */}
          <Route path="articles" element={<HomePage />} />

          {/* Future route for individual articles */}
          <Route path="articles/:slug" element={<ArticlePage />} />
          {/* Sign Up page — */}
          <Route path="sign-up" element={<SignUpPage />} />
          {/* Sign In page — */}
          <Route path="sign-in" element={<SignInPage />} />
          {/* User Settings page — */}
          <Route path="settings" element={<SettingsPage />} />
          {/* User Profile page — */}
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
