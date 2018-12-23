import electron from 'electron'
import path from 'path'
import url from 'url'


const { app, BrowserWindow } = electron
const dirname = path.dirname(new URL(import.meta.url).pathname)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.resolve(dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )

  mainWindow.webContents.openDevTools({
    mode: 'bottom',
    // mode: 'detach',
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})