import { app, BrowserWindow } from 'electron'
import { fork, ChildProcess } from 'child_process'
import findOpenSocket from './utils/find-open-socket'

if (!app) {
  throw new Error('unready!')
}

const isProd = process.env.NODE_ENV === 'production'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

declare const APP_WEBPACK_ENTRY: any
let backendProcess: ChildProcess

const createRendererWindow = (socketName: string): void => {
  // Create the browser window.
  const rendererWin = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/renderer_preload.js',
    },
  })

  // and load the index.html of the app.
  rendererWin.loadURL(APP_WEBPACK_ENTRY)

  // Open the DevTools.
  if (!isProd) {
    rendererWin.webContents.openDevTools()
  }

  rendererWin.webContents.on('did-finish-load', () => {
    rendererWin.webContents.send('set-socket', { name: socketName })
  })
}

function createBackendWindow(socketName: string) {
  const backendWin = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  backendWin.loadURL(`file://${__dirname}/backend-dev.html`)

  backendWin.webContents.on('did-finish-load', () => {
    backendWin.webContents.send('set-socket', { name: socketName })
  })
}

function createBackendProcess(socketName: string) {
  backendProcess = fork(__dirname + '/backend.js', ['--subprocess', app.getVersion(), socketName])

  backendProcess.on('message', (msg) => {
    console.log(msg)
  })
}

app.on('ready', async () => {
  const serverSocket = await findOpenSocket()

  createRendererWindow(serverSocket)

  if (isProd) {
    createBackendProcess(serverSocket)
  } else {
    createBackendWindow(serverSocket)
  }
})

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill()
    backendProcess = null
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
