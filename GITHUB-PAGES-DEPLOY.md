# 🚀 GitHub Pages Deployment Guide

Your Schedio PWA is now configured for deployment at:
**https://davizinh0e.github.io/schedio/**

## ✅ Files Updated for GitHub Pages

Your PWA has been configured with the correct paths:
- ✅ `manifest.json` - Updated with `/schedio/` base path
- ✅ `service-worker.js` - Updated with `/schedio/` base path
- ✅ `schedio.html` - Smart path detection for local and GitHub Pages

## 📦 Required Files for Deployment

Make sure these files are in your repository:

### Essential Files:
```
schedio/
├── schedio.html          ✅ Main app file
├── manifest.json         ✅ PWA manifest
├── service-worker.js     ✅ Service worker
├── icon-192.png          ⚠️ GENERATE THIS
└── icon-512.png          ⚠️ GENERATE THIS
```

### Optional Files (not needed on GitHub Pages):
```
├── generate-icons.html   (Only for local icon generation)
├── start-server.bat      (Only for local testing)
├── start-server.ps1      (Only for local testing)
├── PWA-SETUP.md         (Documentation)
└── QUICKSTART.md        (Documentation)
```

## 🎨 Step 1: Generate Icons

1. **Run locally**: Open `generate-icons.html` in your browser
2. **Download both icons**:
   - `icon-192.png`
   - `icon-512.png`
3. **Add to repository**: Place them in your schedio folder

## 📤 Step 2: Deploy to GitHub Pages

### Option A: Using Git Command Line

```bash
# 1. Add the generated icons
git add icon-192.png icon-512.png

# 2. Add all PWA files
git add manifest.json service-worker.js schedio.html

# 3. Commit
git commit -m "Add PWA support with icons"

# 4. Push to GitHub
git push origin main
```

### Option B: Using GitHub Desktop

1. Open GitHub Desktop
2. Select the files to commit:
   - `icon-192.png`
   - `icon-512.png`
   - `manifest.json`
   - `service-worker.js`
   - `schedio.html`
3. Write commit message: "Add PWA support with icons"
4. Click "Commit to main"
5. Click "Push origin"

### Option C: Using VS Code

1. Open Source Control panel (Ctrl+Shift+G)
2. Stage the files (+ icon next to each file)
3. Write commit message: "Add PWA support with icons"
4. Click ✓ Commit
5. Click "..." → Push

## 🌐 Step 3: Enable GitHub Pages (if not already enabled)

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

## 🎯 Step 4: Test Your PWA

1. **Open your app**: https://davizinh0e.github.io/schedio/schedio.html

2. **Check PWA status**:
   - Open DevTools (F12)
   - Go to **Application** tab
   - Check **Manifest** - should show all info
   - Check **Service Workers** - should be "activated and running"

3. **Install the PWA**:
   - Look for the install icon (➕) in the address bar
   - Click it and select "Install"
   - App opens in standalone window! 🎉

## 📱 Step 5: Test on Mobile

### Android (Chrome):
1. Open: https://davizinh0e.github.io/schedio/schedio.html
2. Tap menu (⋮) → "Add to Home Screen"
3. Tap "Add"
4. Find Schedio icon on home screen
5. Tap to open - runs like a native app!

### iOS (Safari):
1. Open: https://davizinh0e.github.io/schedio/schedio.html
2. Tap Share button (📤)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. Find Schedio icon on home screen
6. Tap to open - runs like a native app!

## 🔧 Troubleshooting

### Service Worker Not Loading?

Check the path in DevTools console. If you see errors:

1. Make sure all paths in `manifest.json` start with `/schedio/`
2. Verify `service-worker.js` has `BASE_PATH = '/schedio/'`
3. Clear cache and hard refresh (Ctrl+Shift+R)

### Icons Not Showing?

1. Verify files are named exactly:
   - `icon-192.png`
   - `icon-512.png`
2. Check they're in the root of your schedio folder
3. Verify they're pushed to GitHub
4. Clear cache and reinstall PWA

### PWA Not Installing?

1. **Check HTTPS**: GitHub Pages uses HTTPS automatically ✅
2. **Check Manifest**: Open DevTools → Application → Manifest
3. **Run Lighthouse Audit**: 
   - DevTools → Lighthouse tab
   - Select "Progressive Web App"
   - Click "Generate report"
   - Fix any issues shown

### Changes Not Appearing?

The service worker caches files. To update:

1. **Update cache version** in `service-worker.js`:
   ```javascript
   const CACHE_NAME = 'schedio-v2'; // Change v1 to v2, v3, etc.
   ```

2. **Commit and push**:
   ```bash
   git add service-worker.js
   git commit -m "Update service worker cache version"
   git push
   ```

3. **Clear old cache**:
   - DevTools → Application → Storage
   - Click "Clear site data"
   - Refresh page

## 🎨 Customization

### Update Theme Colors

Edit `manifest.json`:
```json
{
  "background_color": "#eae8dc",  // Splash screen background
  "theme_color": "#1b2e3c"        // Browser UI color
}
```

### Add More Shortcuts

Edit `manifest.json` shortcuts section to add quick actions:
```json
{
  "name": "Today's Tasks",
  "short_name": "Today",
  "description": "View today's tasks",
  "url": "/schedio/schedio.html?view=today",
  "icons": []
}
```

## 📊 Monitor Your PWA

### Using Google Analytics (Optional)

Add before closing `</head>` in `schedio.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Using Lighthouse CI

Check PWA score automatically:
1. Install: `npm install -g @lhci/cli`
2. Run: `lhci autorun --collect.url=https://davizinh0e.github.io/schedio/schedio.html`

## 🎉 Your Live PWA

✨ **Live URL**: https://davizinh0e.github.io/schedio/schedio.html

### Share Your PWA:
- Direct link: https://davizinh0e.github.io/schedio/schedio.html
- Users can install it directly from their browser
- No app store approval needed
- Works on all platforms (Windows, Mac, Linux, Android, iOS)

### Benefits:
✅ Instant updates (no app store review)
✅ Cross-platform compatibility
✅ Works offline
✅ Native app-like experience
✅ Easy to share (just a URL)
✅ No installation friction

## 📝 Next Steps

1. ✅ Generate icons using `generate-icons.html`
2. ✅ Add icons to repository
3. ✅ Push to GitHub
4. ✅ Test on desktop
5. ✅ Test on mobile
6. ✅ Share with users!

**Need help?** Check the browser console for errors or refer to `PWA-SETUP.md` for detailed troubleshooting.

---

**Your PWA is ready to go! 🚀** Just generate the icons, commit, and push to GitHub Pages!

