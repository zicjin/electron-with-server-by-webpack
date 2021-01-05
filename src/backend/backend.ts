let ipc = require('./ipc')

let isDev, version

if (process.argv[2] === '--subprocess') {
  isDev = false
  version = process.argv[3]

  let socketName = process.argv[4]
  ipc.init(socketName)
} else {
  let { ipcRenderer, remote } = require('electron')
  isDev = true
  version = remote.app.getVersion()

  ipcRenderer.on('set-socket', (event: any, payload: { name: string }) => {
    ipc.init(payload.name)
  })
}

console.log(version, isDev)
