import { app, BrowserWindow } from 'electron'
import { fork, ChildProcess } from 'child_process'
import findOpenSocket from './utils/find-open-socket'

const isProd = process.env.NODE_ENV === 'production'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

declare const APP_WEBPACK_ENTRY: any
let serverProcess: ChildProcess

const createRendererWindow = (socketName: string): void => {
  // Create the browser window.
  const rendererWin = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/rendererPreload.js',
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

function createServerWindow(socketName: string) {
  const serverWin = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  serverWin.loadURL(`file://${__dirname}/server.html`)

  serverWin.webContents.on('did-finish-load', () => {
    serverWin.webContents.send('set-socket', { name: socketName })
  })
}

function createServerProcess(socketName: string) {
  serverProcess = fork(__dirname + '/server.js', [
    '--subprocess',
    app.getVersion(),
    socketName
  ])

  serverProcess.on('message', msg => {
    console.log(msg)
  })
}

app.on('ready', async () => {
  const serverSocket = await findOpenSocket()

  createRendererWindow(serverSocket)

  if (isProd) {
    createServerProcess(serverSocket)
  } else {
    createServerWindow(serverSocket)
  }
})

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill()
    serverProcess = null
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
