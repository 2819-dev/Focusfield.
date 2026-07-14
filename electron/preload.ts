import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("qw", {
  platform: process.platform,
});
