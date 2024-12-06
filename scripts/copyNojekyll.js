// scripts/copyNojekyll.js
const fs = require('fs');
fs.copyFileSync('.nojekyll', 'build/.nojekyll');
console.log('.nojekyll copied to build folder');
