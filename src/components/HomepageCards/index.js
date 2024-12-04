// src/components/HomepageCards/HomepageCards.js

import React, { useState, useEffect } from 'react';
import styles from './HomepageCards.module.css';
import Card from './Card';

export default function HomepageCards() {
  const [activeCard, setActiveCard] = useState(null); // Track which card is active
  const [markdownContent, setMarkdownContent] = useState(''); // Store fetched markdown
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleCardClick = async (label) => {
    if (activeCard === label) {
      // If the clicked card is already active, close it
      setActiveCard(null);
      setMarkdownContent('');
      return;
    }

    setActiveCard(label);
    setIsLoading(true);

    try {
      const response = await fetch(`/blog/${label.toLowerCase().replace(' ', '-')}.md`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      setMarkdownContent(text);
    } catch (error) {
      console.error('Error fetching markdown content:', error);
      setMarkdownContent('### Oops! Something went wrong loading the content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setActiveCard(null);
    setMarkdownContent('');
  };

  // Scroll Lock Effect
  useEffect(() => {
    if (activeCard) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeCard]);

  return (
    <div className={`${styles.container} `}>
      <h1>Isaac Kenney: Software Engineer</h1>
      <p>Disguised as a Design Major for a Semester.</p>

      {/* Card Container */}
      <div className={styles.cardContainer}>
        {['About Me', 'Projects', 'Blog'].map((label) => (
          <Card
            key={label}
            label={label}
            isActive={activeCard === label}
            onClick={() => handleCardClick(label)}
            markdownContent={activeCard === label ? markdownContent : ''}
            isLoading={activeCard === label ? isLoading : false}
            onClose={handleClose}
          />
        ))}
      </div>
    </div>
  );
}
