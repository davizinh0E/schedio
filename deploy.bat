@echo off
echo ========================================
echo    Schedio PWA - Auto Deploy Script
echo ========================================
echo.

REM Check if icons exist
if not exist "icon-192.png" (
    echo [ERROR] icon-192.png not found!
    echo.
    echo Please run these steps first:
    echo 1. Open convert-icon.html in your browser
    echo 2. Upload Untitled.png
    echo 3. Download both icons
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

if not exist "icon-512.png" (
    echo [ERROR] icon-512.png not found!
    echo.
    echo Please run these steps first:
    echo 1. Open convert-icon.html in your browser
    echo 2. Upload Untitled.png
    echo 3. Download both icons
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Icons found!
echo.

echo Adding files to Git...
git add icon-192.png icon-512.png
git add manifest.json service-worker.js schedio.html
git add README.md *.md
git add convert-icon.html
git add start-server.bat start-server.ps1

echo.
echo Committing changes...
git commit -m "Add PWA support with icons and documentation"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Your PWA will be live in 1-2 minutes at:
echo https://davizinh0e.github.io/schedio/schedio.html
echo.
echo You can now install it as an app!
echo.
pause


