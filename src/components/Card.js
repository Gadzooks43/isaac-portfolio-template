import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; // Import SimpleBar styles
import styles from './Card.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function getShareableLink(cardLabel, fileTitle) {
  const url = new URL(window.location);
  url.searchParams.set('card', cardLabel);
  url.searchParams.set('mdName', fileTitle);
  return url.toString();
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

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
  // Track currently selected tag for filtering
  const [selectedTag, setSelectedTag] = useState(null);

  // Gather all unique tags from markdownFiles
  const allTags = useMemo(() => {
    const tagSet = new Set();
    markdownFiles.forEach(file => {
      if (Array.isArray(file.tags)) {
        file.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [markdownFiles]);

  // Filter markdownFiles by selectedTag if any
  const filteredMarkdownFiles = useMemo(() => {
    if (!selectedTag) return markdownFiles;
    return markdownFiles.filter(file => file.tags && file.tags.includes(selectedTag));
  }, [markdownFiles, selectedTag]);

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

  const handleTagClick = (tag) => {
    // Toggle the selectedTag
    setSelectedTag((current) => (current === tag ? null : tag));
  };

  // Remove front matter from the markdown content
  const frontMatterRegex = /^---[\s\S]*?---\s*/;
  const contentWithoutFrontMatter = markdownContent ? markdownContent.replace(frontMatterRegex, '') : '';

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={!isActive ? onClick : undefined}
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

          {/* Tags Section (only show if there are tags) */}
          {allTags.length > 0 && (
            <div className={styles.tagContainer}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`${styles.tagButton} ${selectedTag === tag ? styles.activeTag : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTagClick(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className={styles.content}>
            <SimpleBar className={styles.sidebar}>
              {filteredMarkdownFiles.map((file) => (
                <div
                  key={file.path}
                  className={`${styles.sidebarItem} ${activeMarkdown === file.path ? styles.activeSidebarItem : ''}`}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSelect(file.path);
                    }
                  }}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(file.path);
                    }}
                  >
                    {file.title}
                  </span>
                  {/* Copy button */}
                  <button
                    className={styles.copyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      const shareLink = getShareableLink(label, file.title);
                      copyToClipboard(shareLink);
                    }}
                    aria-label="Copy Link"
                  >
                    📋
                  </button>
                </div>
              ))}
            </SimpleBar>
            <SimpleBar className={styles.markdownContent}>
              {isLoading ? (
                <div className={styles.loader}>
                  <div className={styles.spinner}></div>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {contentWithoutFrontMatter}
                </ReactMarkdown>
              )}
            </SimpleBar>
          </div>
        </div>
      )}
    </div>
  );
}
