const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const isDev = process.env.NODE_ENV !== 'production'
//check if this is mac
const isMac = process.platform === 'darwin'

//Create Main Window
function createMainWindow() {
  const mainWin = new BrowserWindow({
    title: 'Image Resizer',
    width: 500,
    height: 600,
  })
  // open devtool in dev env
  if (isDev) {
    mainWin.webContents.openDevTools()
  }
  mainWin.loadFile(path.join(__dirname, './renderer/index.html'))
}

//Create About Window
function createAboutWindow() {
  const aboutWin = new BrowserWindow({
    title: 'About Page',
    width: 300,
    height: 600,
  })
  if (isDev) {
    aboutWin.webContents.openDevTools()
  }
  aboutWin.loadFile(path.join(__dirname, './renderer/about.html'))
}

//same as app.on('ready',()=>{...})
app.whenReady().then(() => {
  createMainWindow()

  //導入menu
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

//視窗 Menu 設置
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ label: 'About', click: createAboutWindow }],
        },
      ]
    : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'Ctrl+W',
      },
    ],
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [{ label: 'About', click: createAboutWindow }],
        },
      ]
    : []),
  // file 預設可用 { role: 'fileMenu' } 一行代替
]

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
