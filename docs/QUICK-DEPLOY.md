# ⚡ Quick Deploy - 3 Commands

## For First-Time Deployment

```powershell
# 1. Test it works
cd scripts
.\start-server.ps1
# Visit: http://localhost:8000/schedio_3.html
# Press Ctrl+C when done

# 2. Commit everything
cd ..
git add .
git commit -m "feat: Organize structure & refactor CSS"

# 3. Deploy
cd scripts
.\deploy.ps1
```

**Done!** Visit: `https://[your-username].github.io/schedio/schedio_3.html`

---

## For Updates

```powershell
# 1. Test locally
cd scripts && .\start-server.ps1

# 2. Commit & Deploy
cd .. && git add . && git commit -m "Your changes"
cd scripts && .\deploy.ps1
```

---

## Troubleshooting

**Icons missing?**
```powershell
ls ..\assets\icons\
# Should show: icon-192.png, icon-512.png
```

**404 Error?**
- Wait 2 minutes after first deploy
- Check GitHub → Settings → Pages is enabled
- Verify URL matches repository name

**Service worker issues?**
- Clear browser cache
- Hard refresh: Ctrl+Shift+R
- Check DevTools → Application → Service Workers

---

**Full Guide:** See `../DEPLOY-GUIDE.md`

