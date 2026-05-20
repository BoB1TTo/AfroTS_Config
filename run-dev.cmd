@echo off
setlocal

cd /d "%~dp0..\AfroBM\client"
echo Starting AfroBM client dev server...
echo If the default port is busy, Vite will pick the next available one.
echo Workspace: %cd%

npm.cmd run dev

endlocal
