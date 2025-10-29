# 🚀 Deploy in 2 Steps!

## Step 1: Convert Your Icon ⏱️ 2 minutes

1. **Double-click** `convert-icon.html`
2. **Upload** `Untitled.png`
3. **Click** "Download Both Icons"

You'll get:
- ✅ `icon-192.png`
- ✅ `icon-512.png`

Save them in this folder (same location as this file).

## Step 2: Deploy ⏱️ 1 minute

### Windows (Choose One):

**Option A - Batch File:**
```
Double-click: deploy.bat
```

**Option B - PowerShell:**
```
Right-click deploy.ps1 → Run with PowerShell
```

**Option C - Manual:**
```bash
git add icon-192.png icon-512.png manifest.json service-worker.js schedio.html
git commit -m "Add PWA support with icons and documentation"
git push origin main
```

### Mac/Linux:

```bash
git add icon-192.png icon-512.png manifest.json service-worker.js schedio.html
git commit -m "Add PWA support with icons and documentation"
git push origin main
```

## 🎉 Done!

Wait 1-2 minutes, then visit:
**https://davizinh0e.github.io/schedio/schedio.html**

Click the install icon (➕) in your browser!

---

## ⚠️ Troubleshooting

**"Icon not found" error?**
- Go back to Step 1
- Make sure icons are saved in the correct folder

**Git push failed?**
- Check your GitHub credentials
- Make sure you have push access to the repository

**Still need help?**
- See `DEPLOYMENT-CHECKLIST.md` for detailed steps


