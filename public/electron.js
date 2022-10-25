const electron = require('electron')
const { app, ipcMain } = require('electron')
const BrowserWindow = electron.BrowserWindow
const { PosPrinter } = require('electron-pos-printer')

const path = require('path')
const isDev = require('electron-is-dev')
process.setMaxListeners(Infinity)

let mainWindow
let printers

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'Gestor de ordenes CF',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => (mainWindow = null))

  printers = mainWindow.webContents.getPrintersAsync()
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

ipcMain.on('print', (event, args) => {
  const data = JSON.parse(args)

  let printerName
  printers.forEach((printer) => {
    if (printer?.isDefault) {
      printerName = printer?.name
    }
  })

  PosPrinter.print(data, {
    preview: false, // Preview in window or print
    width: '250px', //  width of content body
    margin: '0 0 10px 10px', // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  }).catch((err) => console.log(err))
})
