const workboxConfig = require('./workbox-config')

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

console.log('⛪ Hello from service worker')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
