const { app, BrowserWindow, ipcMain } = require('electron')
const { PosPrinter } = require('electron-pos-printer')
const { join } = require('path')
const isDev = require('electron-is-dev')
const jwt = require('jsonwebtoken')
const fetch = require('electron-fetch').default
process.setMaxListeners(Infinity)

let mainWindow
let contents

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    title: 'Administrador - CentralFood Málaga',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, './preload.js'),
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => (mainWindow = null))

  contents = mainWindow.webContents
}

app.whenReady().then(() => {
  createWindow()
})

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

ipcMain.on('print', (_e, args) => {
  const data = JSON.parse(args)
  let printerName

  contents
    .getPrintersAsync()
    .then((printers) => {
      printerName = printers?.find((printer) => printer.isDefault)

      if (printerName) {
        PosPrinter.print(data, {
          preview: false, // Preview in window or print
          width: '250px', //  width of content body
          margin: '0 0 10px 10px', // margin of content body
          copies: 1, // Number of copies to print
          printerName: printerName.name, // printerName: string, check it at webContent.getPrinters()
          timeOutPerLine: 5000,
          silent: true,
        }).catch((error) => console.log({ error }))
      }
    })
    .catch((err) => console.log({ err }))
})

ipcMain.on('sendMessage', (_e, args) => {
  const payload = { path: args }
  const token = jwt.sign(payload, 'secret jwt sing', {
    expiresIn: '1d',
  })

  fetch(`http://localhost:8000/api/revalidate`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
})
