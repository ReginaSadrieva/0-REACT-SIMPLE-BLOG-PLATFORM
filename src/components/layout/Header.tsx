// src/components/layout/Header.tsx
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import newPostIcon from '../../assets/icons/new-post.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import profileIcon from '../../assets/icons/profile.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        {/* Realworld green logo on the left */}
        <NavLink to="/" className={styles.header__logo}>
          Realworld Blog
        </NavLink>

        {/* Navigation on the right */}
        <nav className={styles.header__nav}>
          <NavLink to="/" className={styles.header__navLink} end>
            Home
          </NavLink>

          <NavLink to="/new-post" className={styles.header__navLink}>
            <img src={newPostIcon} alt="" className={styles.header__navIcon} />
            New Post
          </NavLink>

          <NavLink to="/settings" className={styles.header__navLink}>
            <img src={settingsIcon} alt="" className={styles.header__navIcon} />
            Settings
          </NavLink>

          <NavLink to="/profile" className={styles.header__navLink}>
            <img src={profileIcon} alt="" className={styles.header__navIcon} />
            eni9mu5
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
