# Schedio - Project Structure

This document describes the organized folder structure of the Schedio PWA project.

## 📁 Folder Structure

```
SChedio/
├── 📄 schedio.html              # Main application with refactored semantic classes
├── 📄 manifest.json             # PWA manifest file
├── 📄 service-worker.js         # Service worker for offline functionality
├── 📄 app.js                    # Additional app logic (if any)
├── 📄 PROJECT-STRUCTURE.md      # This file
│
├── 📂 assets/                   # All static assets
│   ├── 📂 icons/                # App icons
│   │   ├── icon-192.png         # 192x192 icon
│   │   └── icon-512.png         # 512x512 icon
│   └── Untitled.png             # Source image for icons
│
├── 📂 docs/                     # Documentation
│   ├── README.md                # Main project README
│   ├── QUICKSTART.md            # Quick start guide
│   ├── PWA-SETUP.md             # PWA setup instructions
│   ├── DEPLOY-NOW.md            # Deployment guide
│   ├── DEPLOYMENT-CHECKLIST.md  # Deployment checklist
│   ├── GITHUB-PAGES-DEPLOY.md   # GitHub Pages deployment guide
│   ├── GITHUB-DEPLOYMENT-SUMMARY.md
│   └── USE-YOUR-OWN-ICON.md     # Icon customization guide
│
├── 📂 scripts/                  # Deployment and utility scripts
│   ├── deploy.bat               # Windows deployment script
│   ├── deploy.ps1               # PowerShell deployment script
│   ├── start-server.bat         # Windows local server script
│   └── start-server.ps1         # PowerShell local server script
│
├── 📂 archive/                  # Old/unused files
│   ├── chedio.html              # Old version
│   ├── schedio_2.html           # Version 2
│   └── convert-icon.html        # Icon conversion utility
│
└── 📂 src/                      # Source code (Java - legacy)
    └── Main.java
```

## 🎯 Key Files

### HTML Files (Root)
- **schedio.html** - Main application with refactored semantic CSS classes and friends feature

### Configuration Files (Root)
- **manifest.json** - PWA configuration
- **service-worker.js** - Offline functionality and caching

### Assets
- All icons are in `assets/icons/`
- Source images in `assets/`

### Documentation
- All markdown documentation files are in `docs/`
- Start with `docs/README.md` for project overview
- Check `docs/QUICKSTART.md` for getting started

### Scripts
- All deployment and server scripts are in `scripts/`
- Run from the scripts folder: `cd scripts` then `./start-server.ps1`

## 🚀 Running the Project

### Local Development
```bash
cd scripts
./start-server.ps1  # or start-server.bat on Windows
```

Then navigate to: `http://localhost:8000/schedio.html`

### Deployment
```bash
cd scripts
./deploy.ps1  # or deploy.bat on Windows
```

## 📝 File Path References

All file paths in the code have been updated to reflect this structure:

- **HTML files**: Icon references point to `assets/icons/icon-*.png`
- **manifest.json**: Icon paths updated to `/schedio/assets/icons/`
- **service-worker.js**: Cache paths updated for new structure
- **Scripts**: Updated to work from the scripts folder

## 🔄 Recent Changes

- ✅ Organized folder structure (docs, assets, scripts, archive)
- ✅ Updated all file path references
- ✅ Moved documentation to `docs/`
- ✅ Moved icons to `assets/icons/`
- ✅ Moved scripts to `scripts/`
- ✅ Archived old HTML files
- ✅ Refactored CSS classes to semantic names in schedio_3.html

## 📚 Next Steps

1. Use `schedio_3.html` for new development (has semantic CSS classes)
2. Check `docs/` for all documentation
3. Run scripts from the `scripts/` folder
4. Keep assets organized in `assets/`

---

For more information, see `docs/README.md`



