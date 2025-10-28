# Schedio PWA - PowerShell Server Starter
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Schedio PWA - Local Server Starter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
$pythonExists = Get-Command python -ErrorAction SilentlyContinue

if ($pythonExists) {
    Write-Host "Starting Python HTTP Server..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Open your browser and navigate to:" -ForegroundColor Yellow
    Write-Host "http://localhost:8000/schedio.html" -ForegroundColor White
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    python -m http.server 8000
} else {
    Write-Host "Python is not installed or not in PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    Write-Host "Or use another method from PWA-SETUP.md" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
}

