const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld('backend', {
  openDevTools: () =>  {
  ipcRenderer.invoke('openDevTools');
  }
})