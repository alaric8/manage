# 环境配置 
1. 安装electron 
```sh
   pnpm create vue@latest # 安装vue 获取其他
   npm install -g electron electron-builder 
```
2. 环境配置 
   1. launch.json
```json
 {
    "configurations": [
        {
            "type": "chrome",
            "name": "http://localhost:5173/",
            "request": "launch",
            "url": "http://localhost:5173/"
        },
        {
            "name": "Electron Main",
            "program": "${workspaceFolder}/electron/main.js",
            "request": "launch",
            "runtimeExecutable": "electron",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "node"
        }
  
    ]
}
```
   2. electron-builder.json
```json
 {
    "appId": "com.yourapp.id",
    "productName": "YourApp",
    "directories": {
      "output": "build"             // 打包输出目录
    },
    "files": [
      "dist/**",                        // 包含构建后的前端文件
      "electron/main.js"                // 包含 Electron 主文件
    ],
    "extraMetadata": {
      "main": "electron/main.js"        // 指定入口文件
    },
    "win": {
      "target": "nsis"                  // Windows 下的目标安装包格式
    },
    "mac": {
      "target": "dmg"                   // macOS 下的目标安装包格式
    },
    "linux": {
      "target": "AppImage"              // Linux 下的目标安装包格式
    },
    "electronVersion": "33.2.0"         // 指定 Electron 版本
  }
```