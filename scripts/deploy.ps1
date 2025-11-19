# Schedio PWA - Auto Deploy Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Schedio PWA - Auto Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if icons exist
if (-not (Test-Path "..\assets\icons\icon-192.png")) {
    Write-Host "[ERROR] icon-192.png not found in assets/icons/!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run these steps first:" -ForegroundColor Yellow
    Write-Host "1. Open archive/convert-icon.html in your browser"
    Write-Host "2. Upload assets/Untitled.png"
    Write-Host "3. Download both icons to assets/icons/"
    Write-Host "4. Run this script again"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "..\assets\icons\icon-512.png")) {
    Write-Host "[ERROR] icon-512.png not found in assets/icons/!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run these steps first:" -ForegroundColor Yellow
    Write-Host "1. Open archive/convert-icon.html in your browser"
    Write-Host "2. Upload assets/Untitled.png"
    Write-Host "3. Download both icons to assets/icons/"
    Write-Host "4. Run this script again"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Icons found!" -ForegroundColor Green
Write-Host ""

Write-Host "Adding files to Git..." -ForegroundColor Yellow
cd ..
git add assets/icons/icon-192.png assets/icons/icon-512.png
git add assets/logo.png
git add manifest.json service-worker.js schedio.html
git add docs/*.md
git add archive/*.html
git add scripts/*.bat scripts/*.ps1
git add assets/

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Add PWA support with icons and documentation"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your PWA will be live in 1-2 minutes at:" -ForegroundColor Yellow
Write-Host "https://davizinh0e.github.io/schedio/schedio.html" -ForegroundColor White
Write-Host ""
Write-Host "You can now install it as an app!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"


