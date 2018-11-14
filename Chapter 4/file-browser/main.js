const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

console.log(app)

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
})