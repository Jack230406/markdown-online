const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const enDir = path.join(outDir, 'en');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      // Skip next-intl metadata files
      if (item.startsWith('__next.')) continue;
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy en/ contents to root out/
console.log('Copying en/ to root for default locale...');
for (const item of fs.readdirSync(enDir)) {
  if (item.startsWith('__next.')) continue;
  const src = path.join(enDir, item);
  const dest = path.join(outDir, item);
  // Don't overwrite _next, _redirects, etc.
  if (item.startsWith('_')) continue;
  copyRecursive(src, dest);
}
console.log('Done! English content available at root.');
