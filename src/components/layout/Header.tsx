// ------------------------------------------------------------------
// Purpose: Main navigation header shown on all pages.
//          Switches between authenticated and guest modes using AuthContext.
//
// Why this component:
//   • Central place for navigation links
//   • Conditional rendering based on authentication state
//   • Reuses icons and styles for consistent design
//
// How it works:
//   • Uses useAuth() to check if user is logged in
//   • Guest mode: Home, Sign In, Sign Up (text links)
//   • Auth mode: Home, New Post (with icon), Settings (with icon), Profile (with icon + username), Log Out (text)
//   • All links use NavLink for active styling
//   • Wrapped in Container for consistent padding
// ------------------------------------------------------------------

import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import newPostIcon from '../../assets/icons/new-post.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import profileIcon from '../../assets/icons/profile.svg';
import Container from '../common/Container';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <Container>
        <header className={styles.header}>
          <div className={styles.header__inner}>
            {/* Realworld green logo on the left */}
            <NavLink to="/" className={styles.header__logo}>
              Realworld Blog
            </NavLink>

            {/* Navigation on the right – conditional based on auth state */}
            <nav className={styles.header__nav}>
              <NavLink to="/" className={styles.header__navLink}>
                Home
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink to="/new-post" className={styles.header__navLink}>
                    <img
                      src={newPostIcon}
                      alt=""
                      className={styles.header__navIcon}
                    />
                    New Post
                  </NavLink>

                  <NavLink to="/settings" className={styles.header__navLink}>
                    <img
                      src={settingsIcon}
                      alt=""
                      className={styles.header__navIcon}
                    />
                    Settings
                  </NavLink>

                  <NavLink to="/profile" className={styles.header__navLink}>
                    <img
                      src={profileIcon}
                      alt=""
                      className={styles.header__navIcon}
                    />
                    {user?.username || 'User'}
                  </NavLink>

                  {/* Log Out button (text only, no icon) */}
                  <button onClick={logout} className={styles.header__navLink}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/sign-in" className={styles.header__navLink}>
                    Sign In
                  </NavLink>

                  <NavLink to="/sign-up" className={styles.header__navLink}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </header>
      </Container>
      <hr className={styles.underline} />
    </>
  );
}
