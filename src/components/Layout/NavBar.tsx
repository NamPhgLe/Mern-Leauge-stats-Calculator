import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

interface NavBarProps {
  signin: boolean;
  onSignout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ signin, onSignout }) => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={location.pathname === '/' ? styles.active : undefined}>
            Home
          </Link>
        </li>
        {!signin && (
          <>
            <li>
              <Link to="/signin" className={location.pathname === '/signin' ? styles.active : undefined}>
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className={location.pathname === '/signup' ? styles.active : undefined}>
                Sign Up
              </Link>
            </li>
          </>
        )}
        {signin && (
          <>
            <li>
              <Link to="/profile" className={location.pathname === '/profile' ? styles.active : undefined}>
                Profile
              </Link>
            </li>
            <li>
              <button onClick={onSignout} className={styles.signOutButton}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
