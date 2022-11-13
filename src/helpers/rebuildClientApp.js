// implement in public/preload
const { electronAPI } = window

export const rebuildClientApp = (path) => {
  electronAPI.sendMessage('sendMessage', path)
}
