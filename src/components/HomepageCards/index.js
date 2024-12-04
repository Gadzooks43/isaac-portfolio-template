// src/components/HomepageCards/HomepageCards.js

import React, { useState, useEffect, useRef } from 'react';
import styles from './HomepageCards.module.css';
import Card from './Card';

export default function HomepageCards() {
  const cards = [
    {
      label: 'Blog',
      markdownFiles: [
        { title: 'Post 1', path: '/blog/post-1.md' },
        { title: 'Post 2', path: '/blog/post-2.md' },
        { title: 'Post 3', path: '/blog/post-3.md' },
      ],
    },
    {
      label: 'Projects',
      markdownFiles: [
        { title: 'Project A', path: '/blog/project-a.md' },
        { title: 'Project B', path: '/blog/project-b.md' },
      ],
    },
    {
      label: 'About Me',
      markdownFiles: [
        { title: 'Introduction', path: '/blog/introduction.md' },
        { title: 'Career', path: '/blog/career.md' },
      ],
    },
  ];

  const [activeCardLabel, setActiveCardLabel] = useState(null); // label of the active card
  const [activeMarkdown, setActiveMarkdown] = useState(null); // path to active markdown
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef({}); // Initialize a cache using useRef

  const handleCardClick = async (card) => {
    if (activeCardLabel === card.label) {
      // Close the card
      setActiveCardLabel(null);
      setActiveMarkdown(null);
      setMarkdownContent('');
      return;
    }

    setActiveCardLabel(card.label);
    setIsLoading(true);

    const firstFile = card.markdownFiles[0];
    setActiveMarkdown(firstFile.path);

    if (cache.current[firstFile.path]) {
      setMarkdownContent(cache.current[firstFile.path]);
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(firstFile.path);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        cache.current[firstFile.path] = text; // Cache the fetched content
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error fetching markdown content:', error);
        setMarkdownContent('### Oops! Something went wrong loading the content.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMarkdownSelect = async (path) => {
    setIsLoading(true);
    try {
      setActiveMarkdown(path);
      if (cache.current[path]) {
        setMarkdownContent(cache.current[path]);
      } else {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        cache.current[path] = text; // Cache the fetched content
        setMarkdownContent(text);
      }
    } catch (error) {
      console.error('Error fetching markdown content:', error);
      setMarkdownContent('### Oops! Something went wrong loading the content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setActiveCardLabel(null);
    setActiveMarkdown(null);
    setMarkdownContent('');
  };

  // Scroll Lock Effect
  useEffect(() => {
    if (activeCardLabel) {
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
  }, [activeCardLabel]);

  return (
    <div className={`${styles.container} ${activeCardLabel ? styles.blurred : ''}`}>
      <h1>Isaac Kenney: Software Engineer</h1>
      <p>Disguised as a Design Major for a Semester.</p>

      {/* Card Container */}
      <div className={styles.cardContainer}>
        {cards.map((card) => (
          <Card
            key={card.label}
            label={card.label}
            isActive={activeCardLabel === card.label}
            onClick={() => handleCardClick(card)}
            markdownFiles={card.markdownFiles}
            activeMarkdown={activeMarkdown}
            markdownContent={markdownContent}
            isLoading={activeCardLabel === card.label ? isLoading : false}
            onSelect={handleMarkdownSelect}
            onClose={handleClose}
          />
        ))}
      </div>
    </div>
  );
}
