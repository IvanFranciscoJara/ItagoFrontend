// const workboxConfig = require('./workbox-config')

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

import { precacheAndRoute, core } from 'workbox-precaching'

console.log('⛪ Hello from service worker')

// core.skipWaiting()
// core.clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)
// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
