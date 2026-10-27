// Run once after "npx cap add android".
// Locks the game to portrait and hides the status bar so it plays full screen.
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main');
const manifestPath = path.join(appDir, 'AndroidManifest.xml');
const stylesPath = path.join(appDir, 'res', 'values', 'styles.xml');

if (!fs.existsSync(manifestPath)) {
  console.error('android/ folder not found. Run "npx cap add android" first.');
  process.exit(1);
}

// 1. Portrait only
let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('android:screenOrientation')) {
  manifest = manifest.replace(/<activity\b/, '<activity\n            android:screenOrientation="portrait"');
  fs.writeFileSync(manifestPath, manifest);
  console.log('Locked to portrait.');
} else {
  console.log('Orientation already set, left as is.');
}

// 2. Full screen (no status bar) on the app and launch themes
if (fs.existsSync(stylesPath)) {
  let styles = fs.readFileSync(stylesPath, 'utf8');
  if (!styles.includes('android:windowFullscreen')) {
    styles = styles.replace(
      /(<style name="AppTheme\.NoActionBar(?:Launch)?"[^>]*>)/g,
      '$1\n        <item name="android:windowFullscreen">true</item>'
    );
    fs.writeFileSync(stylesPath, styles);
    console.log('Full screen enabled.');
  } else {
    console.log('Full screen already set, left as is.');
  }
} else {
  console.warn('styles.xml not found; skipped full screen.');
}
