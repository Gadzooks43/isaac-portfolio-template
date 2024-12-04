// src/components/HomepageCards/Card.js

import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Card.module.css';

export default function Card({
  label,
  isActive,
  onClick,
  markdownContent,
  isLoading,
  onClose,
}) {
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
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className={styles.expandedTitle}>{label}</h2>
          <div className={styles.markdownContent}>
            {isLoading ? (
              <div className={styles.loader}>
                <div className={styles.spinner}></div>
              </div>
            ) : (
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
