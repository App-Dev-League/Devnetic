// main.js

const { app, BrowserWindow, autoUpdater, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');

if (require('electron-squirrel-startup')) return;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  mainWindow.loadFile('./app/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    checkIfNeedUpdate()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

async function checkIfNeedUpdate() {
  if (isDev) return console.log("Currently in development. Not checking if there's a newer version.");
  const server = 'https://your-deployment-url.com'
  const url = `https://update.electronjs.org/App-Dev-League/Devnetic/win32-x64/${app.getVersion()}`

  autoUpdater.setFeedURL({ url })
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Devnetic Update!',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A newer version of Devnetic has been downloaded. Simply restart Devnetic to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })
  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
    const dialogOpts = {
      type: 'info',
      buttons: ['Ok'],
      title: 'Devnetic Error',
      detail: 'We encountered an error while trying to update Devnetic! '+ message.toString()
    }

    dialog.showMessageBox(dialogOpts)
  })
}