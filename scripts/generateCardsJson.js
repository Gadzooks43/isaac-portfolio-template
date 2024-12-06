// scripts/generateCardsJson.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // Added gray-matter import

// Directories and their labels
const directories = [
  { label: 'Blog', dir: 'blog' },
  { label: 'Projects', dir: 'projects' },
  { label: 'About Me', dir: 'about-me' },
];

// Root directory of markdown files under public
const contentRoot = path.join(process.cwd(), 'public', 'content');

function filenameToTitle(filename) {
  const baseName = filename.replace('.md', '');
  return baseName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const cardsData = directories.map(({ label, dir }) => {
  const dirPath = path.join(contentRoot, dir);

  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}, skipping`);
    return { label, markdownFiles: [] };
  }

  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));

  const markdownFiles = files.map(file => {
    const title = filenameToTitle(file);
    var filePath = `content/${dir}/${file}`;
    // take out .md extension for the slug
    // filePath = filePath.replace(/\.md$/, '');

    // Read the file content and parse front matter
    const fullPath = path.join(dirPath, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(content); // parse front matter

    // Extract slug from front matter if present
    const slug = data.slug || null;

    return { title, path: filePath, slug };
  });

  return { label, markdownFiles };
});

const outputPath = path.join(process.cwd(), 'public', 'cards.json');
fs.writeFileSync(outputPath, JSON.stringify(cardsData, null, 2));
console.log(`cards.json generated with ${cardsData.length} card entries!`);
