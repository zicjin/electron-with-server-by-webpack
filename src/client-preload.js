const { ipcRenderer } = require('electron')
const isDev = require('electron-is-dev')
const ipc = require('node-ipc')
const uuid = require('uuid')

window.IS_DEV = isDev

let resolveSocketPromise
window.getServerSocket = () => {
  return new Promise(resolve => {
    resolveSocketPromise = resolve
  })
}

ipcRenderer.on('set-socket', (event, { name }) => {
  resolveSocketPromise(name)
})

window.ipcConnect = (id, func) => {
  ipc.config.silent = true
  ipc.connectTo(id, () => {
    func(ipc.of[id])
  })
}

window.uuid = uuid
