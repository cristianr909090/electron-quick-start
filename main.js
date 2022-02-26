// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require("url");
const exec = require('child_process').execFile;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:  true,
      // contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })


  mainWindow.loadURL('http://127.0.0.1:8001');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

/**
 * Function to execute exe
 * @param {string} fileName The name of the executable file to run.
 * @param {string[]} params List of string arguments.
 * @param {string} path Current working directory of the child process.
 */
function execute(fileName, params){//, path) {
  console.log("running exe")
  let promise = new Promise((resolve, reject) => {
    exec(fileName, params, /*{ cwd: path },*/ (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });

  });
  return promise;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if(execute("cu5.exe", []))//, "G:/admintool/emAdmintool/nativeMessaging/"))
    createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
