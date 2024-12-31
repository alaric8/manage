import { app, BrowserWindow, dialog } from 'electron'; // 导入 dialog
import electronUpdater from 'electron-updater'; // 默认导入 electron-updater
import path from 'path';
const { autoUpdater } = electronUpdater;               // 解构获取 autoUpdater

// 用 import.meta.url 获取 __dirname 的替代方案
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // 使用 __dirname 替代
      nodeIntegration: false,  // Prevent Node.js integration in the renderer process
      contextIsolation: true,  // Enable context isolation for better security
    }
  });
  // 开发环境加载本地 URL，否则加载打包后的 HTML 文件
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    const indexPath = path.resolve(app.getAppPath(), 'dist/index.html');
    mainWindow.loadFile(indexPath);
  }

  // 如果是打包后的应用，检查更新
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.on('ready', () => {
  createWindow();

  // 监听更新可用事件
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. Downloading now...'
    });
  });

  // 监听更新下载完成事件
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(
      {
        type: 'info',
        title: 'Update Ready',
        message: 'Install and restart now?',
        buttons: ['Yes', 'Later']
      },
      (response) => {
        if (response === 0) autoUpdater.quitAndInstall();  // 用户点击 "Yes" 后，安装并重启
      }
    );
  });
  // 监听错误事件
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? 'unknown' : error.toString());
  });
});
