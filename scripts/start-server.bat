@echo off
echo ========================================
echo    Schedio PWA - Local Server Starter
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting Python HTTP Server...
    echo.
    echo Open your browser and navigate to:
    echo http://localhost:8000/schedio.html
    echo.
    echo Press Ctrl+C to stop the server
    echo ========================================
    echo.
    cd ..
    python -m http.server 8000
) else (
    echo Python is not installed or not in PATH.
    echo.
    echo Please install Python from https://www.python.org/
    echo Or use another method from docs/PWA-SETUP.md
    echo.
    pause
)

