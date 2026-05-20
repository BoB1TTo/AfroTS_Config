$ErrorActionPreference = 'Stop'

Set-Location -LiteralPath (Join-Path (Split-Path -Parent $PSScriptRoot) 'AfroBM\client')

Write-Host 'Starting AfroBM client desktop launcher...'
Write-Host 'Step 1: start the Vite web server'
Write-Host 'Step 2: wait until http://127.0.0.1:5173 is ready'
Write-Host 'Step 3: open the browser window'

$viteProcess = Start-Process -FilePath npm.cmd -ArgumentList @('run', 'dev', '--', '--host', '127.0.0.1') -PassThru -WindowStyle Hidden

$ready = $false
for ($i = 0; $i -lt 60; $i++) {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5173/' -TimeoutSec 2
    if ($response.StatusCode -eq 200) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Milliseconds 500
  }
}

if (-not $ready) {
  Stop-Process -Id $viteProcess.Id -ErrorAction SilentlyContinue
  throw 'Vite did not become ready on http://127.0.0.1:5173/'
}

Start-Process -FilePath 'http://127.0.0.1:5173/'
