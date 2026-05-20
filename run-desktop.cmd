@echo off
setlocal

cd /d "%~dp0..\AfroBM\client"
echo Starting AfroBM client desktop launcher...
echo Step 1: start the Vite web server
echo Step 2: wait until http://127.0.0.1:5173 is ready
echo Step 3: open the browser window

start "AfroBM Client Vite" /min cmd /c npm.cmd run dev -- --host 127.0.0.1

:wait_loop
powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5173/' -TimeoutSec 2).StatusCode } catch { exit 1 }" >nul 2>nul
if errorlevel 1 (
  timeout /t 1 /nobreak >nul
  goto wait_loop
)

start "" "http://127.0.0.1:5173/"

endlocal
