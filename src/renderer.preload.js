const { ipcRenderer } = require('electron')
const ipc = require('node-ipc')
const uuid = require('uuid')

window.isProd = process.env.NODE_ENV === 'production'

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
