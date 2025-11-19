@echo off
echo ========================================
echo    Schedio PWA - Auto Deploy Script
echo ========================================
echo.

REM Check if icons exist
if not exist "..\assets\icons\icon-192.png" (
    echo [ERROR] icon-192.png not found in assets/icons/!
    echo.
    echo Please run these steps first:
    echo 1. Open archive/convert-icon.html in your browser
    echo 2. Upload assets/Untitled.png
    echo 3. Download both icons to assets/icons/
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

if not exist "..\assets\icons\icon-512.png" (
    echo [ERROR] icon-512.png not found in assets/icons/!
    echo.
    echo Please run these steps first:
    echo 1. Open archive/convert-icon.html in your browser
    echo 2. Upload assets/Untitled.png
    echo 3. Download both icons to assets/icons/
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Icons found!
echo.

echo Adding files to Git...
cd ..
git add assets/icons/icon-192.png assets/icons/icon-512.png
git add assets/logo.png
git add manifest.json service-worker.js schedio.html
git add docs/*.md
git add archive/*.html
git add scripts/*.bat scripts/*.ps1
git add assets/

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


