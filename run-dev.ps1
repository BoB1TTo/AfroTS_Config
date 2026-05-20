$ErrorActionPreference = 'Stop'

Set-Location -LiteralPath (Join-Path (Split-Path -Parent $PSScriptRoot) 'AfroBM\client')

Write-Host 'Starting AfroBM client dev server...'
Write-Host 'If the default port is busy, Vite will pick the next available one.'
Write-Host ("Workspace: {0}" -f (Get-Location).Path)

& npm.cmd run dev
