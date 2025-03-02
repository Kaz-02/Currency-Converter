const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getApiKey: async () => await ipcRenderer.invoke("get-api-key"),
});
