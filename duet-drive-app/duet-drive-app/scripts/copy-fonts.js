// Copies the game fonts from node_modules into www/fonts so the app works fully offline.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'www', 'fonts');
fs.mkdirSync(out, { recursive: true });

const files = [
  ['@fontsource/bungee/files/bungee-latin-400-normal.woff2', 'bungee-400.woff2'],
  ['@fontsource/chakra-petch/files/chakra-petch-latin-500-normal.woff2', 'chakra-petch-500.woff2'],
  ['@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff2', 'chakra-petch-600.woff2'],
  ['@fontsource/chakra-petch/files/chakra-petch-latin-700-normal.woff2', 'chakra-petch-700.woff2'],
];

let missing = 0;
for (const [src, dest] of files) {
  const from = path.join(root, 'node_modules', src);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, path.join(out, dest));
    console.log('font copied:', dest);
  } else {
    missing++;
    console.warn('font not found (game will use a fallback font):', src);
  }
}
if (missing) console.warn('Run "npm install" first if fonts are missing.');
