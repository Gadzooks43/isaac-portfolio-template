// src/components/HomepageCards/Card.js

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; // Import SimpleBar styles
import styles from './Card.module.css';

export default function Card({
  label,
  isActive,
  onClick,
  markdownFiles,
  activeMarkdown,
  markdownContent,
  isLoading,
  onSelect,
  onClose,
}) {
  // Handle Escape key to close the expanded card
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isActive) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isActive, onClose]);

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={isActive ? onClose : onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          isActive ? onClose() : onClick();
        }
      }}
      aria-pressed={isActive}
    >
      {!isActive ? (
        <h3 className={styles.label}>{label}</h3>
      ) : (
        <div className={styles.expandedContent}>
          <div className={styles.header}>
            <h2 className={styles.expandedTitle}>{label}</h2>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.sidebar}>
              {markdownFiles.map((file) => (
                <div
                  key={file.path}
                  className={`${styles.sidebarItem} ${activeMarkdown === file.path ? styles.activeSidebarItem : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(file.path);
                  }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSelect(file.path);
                    }
                  }}
                >
                  {file.title}
                </div>
              ))}
            </div>
            <SimpleBar className={styles.markdownContent}>
              {isLoading ? (
                <div className={styles.loader}>
                  <div className={styles.spinner}></div>
                </div>
              ) : (
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              )}
            </SimpleBar>
          </div>
        </div>
      )}
    </div>
  );
}
