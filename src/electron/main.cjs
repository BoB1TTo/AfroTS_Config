const { app, BrowserWindow } = require('electron')
const fs = require('node:fs')
const path = require('node:path')

let mainWindow = null

const PORTABLE_DATA_DIR = 'AfroTS-Data'
const PORTABLE_SETTINGS_FILE = 'portable-settings.json'
const PORTABLE_DATABASE_FILE = 'ATSDB.SQLite'

function getPortableRoot() {
  return process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(process.execPath)
}

function ensurePortableWorkspace() {
  if (!app.isPackaged) {
    return null
  }

  const portableRoot = getPortableRoot()
  const settingsDir = path.join(portableRoot, PORTABLE_DATA_DIR)
  const settingsPath = path.join(settingsDir, PORTABLE_SETTINGS_FILE)
  const databasePath = path.join(portableRoot, PORTABLE_DATABASE_FILE)

  fs.mkdirSync(settingsDir, { recursive: true })

  if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, '')
  }

  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(
      settingsPath,
      JSON.stringify(
        {
          appName: app.getName(),
          appVersion: app.getVersion(),
          databaseFile: PORTABLE_DATABASE_FILE,
          createdAt: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
  }

  app.setPath('userData', settingsDir)

  return {
    portableRoot,
    settingsDir,
    settingsPath,
    databasePath,
  }
}

const portableWorkspace = ensurePortableWorkspace()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1200,
    minHeight: 760,
    title: 'AfroTech Suite',
    backgroundColor: '#f6f8fb',
  })

  const indexPath = path.join(app.getAppPath(), 'dist', 'index.html')
  mainWindow.loadFile(indexPath)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  if (portableWorkspace) {
    console.log(`Portable workspace ready in AfroTS-Data: ${portableWorkspace.settingsDir}`)
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
