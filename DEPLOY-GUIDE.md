# 🚀 Schedio - Build & Deploy Guide

## Quick Deploy (3 Steps)

### 1️⃣ Test Locally
```powershell
cd scripts
.\start-server.ps1
```
Open: `http://localhost:8000/schedio.html`

### 2️⃣ Commit Changes
```powershell
git add .
git commit -m "Refactor: Organize folder structure and semantic CSS classes"
```

### 3️⃣ Deploy to GitHub Pages
```powershell
cd scripts
.\deploy.ps1
```

Your app will be live at: `https://[your-username].github.io/schedio/schedio.html`

---

## 📋 Detailed Deployment Guide

### Prerequisites ✅

Before deploying, ensure you have:
- [x] Git installed
- [x] GitHub account set up
- [x] Repository created (e.g., `schedio`)
- [x] GitHub Pages enabled in repository settings

### Step-by-Step Deployment

#### **Step 1: Test Locally First** 🧪

```powershell
# From project root
cd scripts
.\start-server.ps1
```

**Test these URLs:**
- `http://localhost:8000/schedio_3.html` ✨ (Refactored version)
- `http://localhost:8000/schedio.html` (Original version)

**What to check:**
- ✅ App loads without errors
- ✅ Icons display correctly
- ✅ PWA manifest works
- ✅ All screens accessible (Home, Calendar, Stats, Settings)
- ✅ Dark mode toggle works
- ✅ Language toggle works (EN/PT)
- ✅ Navigation between screens works

Press `Ctrl+C` to stop the server.

---

#### **Step 2: Review Changes** 📝

Check what's changed:
```powershell
git status
```

You should see:
```
Modified:
  schedio.html
  schedio_3.html
  manifest.json
  service-worker.js
  scripts/deploy.ps1
  scripts/deploy.bat
  scripts/start-server.ps1
  scripts/start-server.bat

New files:
  PROJECT-STRUCTURE.md
  ORGANIZATION-SUMMARY.md
  DEPLOY-GUIDE.md
  
New folders:
  docs/
  assets/icons/
  scripts/
  archive/
```

---

#### **Step 3: Commit All Changes** 💾

```powershell
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Organize folder structure and refactor CSS classes

- Organize project into docs/, assets/, scripts/, archive/
- Refactor div classes with semantic names in schedio_3.html
- Update all file paths in HTML, manifest, and service worker
- Update deployment scripts for new structure
- Add comprehensive documentation"
```

---

#### **Step 4: Push to GitHub** 📤

**Option A: Using the Deploy Script (Recommended)**

```powershell
cd scripts
.\deploy.ps1
```

The script will:
1. ✅ Check if icons exist
2. ✅ Add all necessary files
3. ✅ Commit changes
4. ✅ Push to GitHub
5. ✅ Show deployment URL

**Option B: Manual Push**

```powershell
# From project root
git push origin main
```

---

#### **Step 5: Verify Deployment** 🔍

1. **Wait 1-2 minutes** for GitHub Pages to build

2. **Visit your deployment URL:**
   ```
   https://[your-username].github.io/schedio/schedio.html
   ```

3. **Check:**
   - ✅ Page loads successfully
   - ✅ Icons appear in browser tab
   - ✅ PWA install prompt appears (on mobile/Chrome)
   - ✅ Service worker registers (check browser DevTools → Application → Service Workers)
   - ✅ App works in all screens
   - ✅ Can install as PWA

---

## 🔧 Troubleshooting

### Issue: Icons Not Loading

**Problem:** Icons show broken image or 404

**Solution:**
```powershell
# Check icons exist
ls assets/icons/

# Should show:
# icon-192.png
# icon-512.png
```

If missing, check `archive/convert-icon.html` to generate icons from `assets/Untitled.png`

---

### Issue: Service Worker Not Registering

**Problem:** PWA features don't work offline

**Solution:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Unregister old service workers:
   - DevTools → Application → Service Workers → Unregister
3. Hard refresh (Ctrl+Shift+R)
4. Check service-worker.js paths are correct

---

### Issue: GitHub Pages 404

**Problem:** Deployment URL shows 404

**Solutions:**

1. **Check repository settings:**
   - Go to repository → Settings → Pages
   - Source should be: `main` branch, `/ (root)`
   - Save if changed

2. **Check repository name:**
   - If repo name is `schedio`, URL is:
     `https://[username].github.io/schedio/schedio_3.html`
   - If repo name is different, update `manifest.json`:
     ```json
     "start_url": "/[repo-name]/schedio_3.html",
     "scope": "/[repo-name]/"
     ```

3. **Wait longer:**
   - First deployment can take 5-10 minutes
   - Subsequent deployments: 1-2 minutes

---

### Issue: Manifest Not Found

**Problem:** PWA install doesn't work

**Solution:**

Check `manifest.json` paths match your repository:

```json
{
  "start_url": "/schedio/schedio_3.html",
  "scope": "/schedio/",
  "icons": [
    {
      "src": "/schedio/assets/icons/icon-192.png",
      ...
    }
  ]
}
```

Update `/schedio/` to match your repository name.

---

## 🎯 Deployment Checklist

Use this before every deployment:

### Pre-Deployment
- [ ] Code tested locally
- [ ] No console errors
- [ ] All features work
- [ ] Icons load correctly
- [ ] PWA manifest valid
- [ ] Service worker updates version number
- [ ] Documentation updated
- [ ] Git status clean (no uncommitted changes)

### During Deployment
- [ ] All files committed
- [ ] Meaningful commit message
- [ ] Pushed to correct branch (main)

### Post-Deployment
- [ ] Wait 2 minutes
- [ ] Visit deployment URL
- [ ] Test on mobile
- [ ] Test PWA install
- [ ] Test offline functionality
- [ ] Check all navigation
- [ ] Verify icons in multiple places

---

## 🔄 Update Workflow

For future updates:

```powershell
# 1. Make changes to code
# Edit schedio_3.html, add features, etc.

# 2. Update service worker cache version
# In service-worker.js, increment version:
const CACHE_NAME = 'schedio-v2'; # was v1

# 3. Test locally
cd scripts
.\start-server.ps1
# Test at http://localhost:8000/schedio_3.html

# 4. Commit and deploy
git add .
git commit -m "feat: Add new feature XYZ"
git push origin main

# Or use deploy script:
cd scripts
.\deploy.ps1

# 5. Wait and verify
# Visit: https://[username].github.io/schedio/schedio_3.html
```

---

## 📱 Testing on Mobile

### Android Chrome
1. Visit your deployment URL
2. Menu → Add to Home Screen
3. App installs as PWA
4. Test offline by turning on Airplane Mode

### iOS Safari
1. Visit your deployment URL
2. Share button → Add to Home Screen
3. App installs as web app
4. Limited offline support (iOS restrictions)

---

## 🌐 Custom Domain (Optional)

To use a custom domain (e.g., `schedio.yourdomain.com`):

1. **Add CNAME file:**
   ```powershell
   echo "schedio.yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Update DNS:**
   - Add CNAME record pointing to: `[username].github.io`

3. **Update manifest.json:**
   ```json
   "start_url": "/schedio_3.html",
   "scope": "/"
   ```

4. **Update service-worker.js:**
   ```javascript
   const BASE_PATH = '/';
   ```

---

## 📊 Monitoring Deployment

### Check Deployment Status

**GitHub Actions:**
1. Go to repository on GitHub
2. Click "Actions" tab
3. See deployment progress

**GitHub Pages:**
1. Repository → Settings → Pages
2. See deployment status and URL

### View Deployment Logs

If deployment fails:
1. GitHub → Actions tab
2. Click failed workflow
3. View error logs
4. Fix issues and redeploy

---

## 🎨 Quick Reference Commands

```powershell
# Test locally
cd scripts && .\start-server.ps1

# Check status
git status

# Commit all changes
git add . && git commit -m "Your message"

# Deploy (automated)
cd scripts && .\deploy.ps1

# Deploy (manual)
git push origin main

# View deployment
# https://[username].github.io/schedio/schedio_3.html
```

---

## 🚀 You're Ready to Deploy!

Your app is now organized and ready for deployment. The refactored version (`schedio_3.html`) has:

- ✅ Clean, semantic CSS classes
- ✅ Organized folder structure
- ✅ Updated file paths
- ✅ Professional documentation

**Next Steps:**
1. Test locally using `scripts/start-server.ps1`
2. Commit changes: `git add . && git commit -m "..."`
3. Deploy: `cd scripts && .\deploy.ps1`
4. Visit your live app!

For questions, see:
- `docs/QUICKSTART.md` - Getting started
- `docs/PWA-SETUP.md` - PWA details
- `PROJECT-STRUCTURE.md` - Folder organization
- `ORGANIZATION-SUMMARY.md` - What changed

---

**Happy Deploying! 🎉**

