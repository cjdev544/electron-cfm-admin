const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel, args) => ipcRenderer.send(channel, args),
})
