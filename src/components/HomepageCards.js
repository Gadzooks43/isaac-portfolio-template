import React, { useState, useEffect, useRef } from 'react';
import styles from './HomepageCards.module.css';
import Card from './Card';
import Navbar from './Navbar';

export default function HomepageCards({ onToggleDarkMode, darkMode }) {
  const [cards, setCards] = useState([]);
  const [activeCardLabel, setActiveCardLabel] = useState(null);
  const [activeMarkdown, setActiveMarkdown] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef({});

  const query = new URLSearchParams(window.location.search);
  const cardParam = query.get('card');     
  const mdNameParam = query.get('mdName'); 

  // Check old link format: /blog/post-1
  const pathname = window.location.pathname; 
  const oldLinkMatch = pathname.match(/^\/(blog|projects|about-me)\/([^/]+)$/i);
  let oldLinkDir = null;
  let oldLinkSlug = null;
  if (oldLinkMatch) {
    oldLinkDir = oldLinkMatch[1].toLowerCase();
    oldLinkSlug = oldLinkMatch[2];
  }

  const dirToLabelMap = {
    'blog': 'Blog',
    'projects': 'Projects',
    'about-me': 'About Me'
  };

  useEffect(() => {
    fetch('cards.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error('Error loading cards data:', err));
  }, []);

  const handleCardOpen = async (card, filePath) => {
    setActiveCardLabel(card.label);
    setIsLoading(true);

    if (cache.current[filePath]) {
      setMarkdownContent(cache.current[filePath]);
      setIsLoading(false);
      setActiveMarkdown(filePath);
    } else {
      try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        cache.current[filePath] = text;
        setMarkdownContent(text);
        setActiveMarkdown(filePath);
      } catch (error) {
        console.error('Error fetching markdown content:', error);
        setMarkdownContent('### Oops! Something went wrong loading the content.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCardClick = async (card) => {
    if (activeCardLabel === card.label) {
      setActiveCardLabel(null);
      setActiveMarkdown(null);
      setMarkdownContent('');
      return;
    }
    const firstFile = card.markdownFiles[0];
    handleCardOpen(card, firstFile.path);
  };

  const handleMarkdownSelect = async (path) => {
    setIsLoading(true);
    try {
      setActiveMarkdown(path);
      if (cache.current[path]) {
        setMarkdownContent(cache.current[path]);
      } else {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        cache.current[path] = text;
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

  useEffect(() => {
    document.body.style.overflow = activeCardLabel ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeCardLabel]);

  // Once cards are loaded, handle URL params or old link
  useEffect(() => {
    if (cards.length > 0) {
      if (cardParam && mdNameParam) {
        // New param style
        const targetCard = cards.find(c => c.label.toLowerCase() === cardParam.toLowerCase());
        if (targetCard) {
          // Find file by title
          const targetFile = targetCard.markdownFiles.find(file => file.title.toLowerCase() === mdNameParam.toLowerCase());
          if (targetFile) {
            handleCardOpen(targetCard, targetFile.path);
          } else {
            // No exact match, open first file
            handleCardOpen(targetCard, targetCard.markdownFiles[0].path);
          }
        }
      } else if (oldLinkDir && oldLinkSlug) {
        // Old link style: /blog/post-1
        const cardLabel = dirToLabelMap[oldLinkDir];
        if (cardLabel) {
          const targetCard = cards.find(c => c.label === cardLabel);
          if (targetCard) {
            // We have slug in files now, find file by slug or by filename
            const targetFile = targetCard.markdownFiles.find(file =>
              (file.slug && file.slug.toLowerCase() === oldLinkSlug.toLowerCase()) ||
              file.path.toLowerCase().includes(oldLinkSlug.toLowerCase())
            );
            if (targetFile) {
              handleCardOpen(targetCard, targetFile.path);
            } else {
              // No match, fallback to first file
              handleCardOpen(targetCard, targetCard.markdownFiles[0].path);
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, cardParam, mdNameParam, oldLinkDir, oldLinkSlug]);

  const activeCard = activeCardLabel ? cards.find(c => c.label === activeCardLabel) : null;

  return (
    <div className={styles.container}>
      <div className={`${styles.blurWrapper} ${activeCardLabel ? styles.blurred : ''}`}>
        <Navbar onToggleDarkMode={onToggleDarkMode} darkMode={darkMode} />
        <h1>Isaac Kenney: Software Engineer</h1>
        <p>Presents a very bland portfolio</p>

        <div className={styles.cardContainer}>
          {cards.map((card) => {
            if (card.label === activeCardLabel) return null;
            return (
              <Card
                key={card.label}
                label={card.label}
                isActive={false}
                onClick={() => handleCardClick(card)}
                markdownFiles={card.markdownFiles}
                activeMarkdown={null}
                markdownContent={''}
                isLoading={false}
                onSelect={handleMarkdownSelect}
                onClose={handleClose}
              />
            );
          })}
        </div>
      </div>

      {activeCard && (
        <Card
          label={activeCard.label}
          isActive={true}
          onClick={() => handleCardClick(activeCard)}
          markdownFiles={activeCard.markdownFiles}
          activeMarkdown={activeMarkdown}
          markdownContent={markdownContent}
          isLoading={isLoading}
          onSelect={handleMarkdownSelect}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
