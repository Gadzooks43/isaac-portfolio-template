import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ onToggleDarkMode, darkMode }) {
  const [showContactMenu, setShowContactMenu] = useState(false);
  const contactButtonRef = useRef(null);

  const toggleContactMenu = () => {
    setShowContactMenu((prev) => !prev);
  };

  // Optional: click outside to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (showContactMenu && contactButtonRef.current && !contactButtonRef.current.contains(e.target)) {
        setShowContactMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContactMenu]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <img src={process.env.PUBLIC_URL + "/img/headshot.png"} alt="Profile" className={styles.profilePic} />
        <span className={styles.title}>Isaac's Portfolio</span>
      </div>

      <div className={styles.navRight}>
        <a href="https://github.com/gadzooks43/isaac-portfolio-template" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <div className={styles.contactContainer} ref={contactButtonRef}>
          <button
            className={styles.contactButton}
            onClick={toggleContactMenu}
            aria-expanded={showContactMenu}
            aria-haspopup="true"
          >
            Contact
          </button>
          {showContactMenu && (
            <div className={styles.contactMenu}>
              <p>Email: kenneyisaac43@gmail.com</p>
            </div>
          )}
        </div>
        <button
          className={styles.darkModeButton}
          onClick={onToggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? '☀' : '☀'}
        </button>
      </div>
    </nav>
  );
}
