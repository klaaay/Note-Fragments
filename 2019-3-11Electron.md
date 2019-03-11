- [安装 Electron](#%E5%AE%89%E8%A3%85-electron)
  - [初始项目和安装依赖包](#%E5%88%9D%E5%A7%8B%E9%A1%B9%E7%9B%AE%E5%92%8C%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96%E5%8C%85)
  - [配置 scripts](#%E9%85%8D%E7%BD%AE-scripts)
- [加载第一个 Hello World 页面](#%E5%8A%A0%E8%BD%BD%E7%AC%AC%E4%B8%80%E4%B8%AA-hello-world-%E9%A1%B5%E9%9D%A2)
  - [创建 html 模板文件(index.html)](#%E5%88%9B%E5%BB%BA-html-%E6%A8%A1%E6%9D%BF%E6%96%87%E4%BB%B6indexhtml)
  - [创建 electron 默认启动文件(index.js)](#%E5%88%9B%E5%BB%BA-electron-%E9%BB%98%E8%AE%A4%E5%90%AF%E5%8A%A8%E6%96%87%E4%BB%B6indexjs)
  - [启动 electron 程序](#%E5%90%AF%E5%8A%A8-electron-%E7%A8%8B%E5%BA%8F)
- [html 模板与 electron-app 之间的通讯](#html-%E6%A8%A1%E6%9D%BF%E4%B8%8E-electron-app-%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E8%AE%AF)
  - [html 模板发送事件](#html-%E6%A8%A1%E6%9D%BF%E5%8F%91%E9%80%81%E4%BA%8B%E4%BB%B6)
  - [elctron-app 接受事件以及回传事件](#elctron-app-%E6%8E%A5%E5%8F%97%E4%BA%8B%E4%BB%B6%E4%BB%A5%E5%8F%8A%E5%9B%9E%E4%BC%A0%E4%BA%8B%E4%BB%B6)
  - [html 模板处理回传事件](#html-%E6%A8%A1%E6%9D%BF%E5%A4%84%E7%90%86%E5%9B%9E%E4%BC%A0%E4%BA%8B%E4%BB%B6)
- [elctron-app 导航栏信息的配置](#elctron-app-%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%BF%A1%E6%81%AF%E7%9A%84%E9%85%8D%E7%BD%AE)
  - [配置导航栏模板](#%E9%85%8D%E7%BD%AE%E5%AF%BC%E8%88%AA%E6%A0%8F%E6%A8%A1%E6%9D%BF)
  - [应用导航栏模板](#%E5%BA%94%E7%94%A8%E5%AF%BC%E8%88%AA%E6%A0%8F%E6%A8%A1%E6%9D%BF)
- [elctron-app 窗口相关配置信息](#elctron-app-%E7%AA%97%E5%8F%A3%E7%9B%B8%E5%85%B3%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF)

# 安装 Electron

## 初始项目和安装依赖包

> mkdir ElectronDemo  
> cd ElectronDemo  
> npm init  
> npm i electron --save

## 配置 scripts

> "scripts": {  
> &nbsp;&nbsp;&nbsp;&nbsp;"electron": "electron ."  
> },

# 加载第一个 Hello World 页面

## 创建 html 模板文件(index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head> </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

## 创建 electron 默认启动文件(index.js)

```javascript
const electron = require("electron");
// 用于文件路径获取
const path = require("path");
// electron内置api
const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(path.resolve(__dirname, "index.html"));
});
```

## 启动 electron 程序

> npm run electron

# html 模板与 electron-app 之间的通讯

> 通讯模式类似与 webscoket

## html 模板发送事件

```javascript
// electron内置用于通讯的api
const electron = require("electron");
const { ipcRenderer } = electron;

// 事件发送实例 - 当表单提交的时候触发elctron通讯
document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  const { path } = document.querySelector("input").files[0];
  // 关键事件发送代码 - 发送一个名为"video:sumbmit"的事件, 并负载path信息
  ipcRenderer.send("video:submit", { path });
});
```

## elctron-app 接受事件以及回传事件

```javascript
// 接受到"video:submit"事件并处理携带的信息
// 此处event参数主要用于不同html页面触发相同事件的区分
ipcMain.on("video:submit", (event, { path }) => {
  // 回传事件和信息
  mainWindow.webContents.send("video:meta", { path: `from server:${path}` });
});
```

## html 模板处理回传事件

```javascript
ipcRenderer.on("video:meta", (event, { path }) => {
  document.querySelector("p").innerHTML = path;
});
```

# elctron-app 导航栏信息的配置

## 配置导航栏模板

```javascript
// 导航栏配置结构
// -- Menu-item
// ---- SubMenu-item
// label - 导航栏标签名字
// clcik - 点击该标签触发的函数
// accelerator - 键盘快捷键
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        // focusedWindow -  当前被选中的窗口
        click(item, focusedWindow) {
          createAddWindow();
        }
      },
      {
        label: "Clear Todos",
        click() {
          mainWindow.webContents.send("todo:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command + Q" : "Ctrl + Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "About",
    click() {
      createAboutWindow();
    }
  },
  {
    label: "Time",
    click() {
      createTimeWindow();
    }
  }
];
```

## 应用导航栏模板

```javascript
const { app, BrowserWindow, Menu, ipcMain } = electron;
```

```javascript
const mainMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(mainMenu);
```

# elctron-app 窗口相关配置信息

```javascript
myWindow = new BrowserWindow({
  height: 200,
  width: 300,
  title: "myWindow",
  frame: false,
  resizable: false,
  show: false
});
```
