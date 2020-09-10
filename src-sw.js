// const workboxConfig = require('./workbox-config')

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

import { precacheAndRoute, supressWarnings, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
// import { supressWarnings } from 'workbox-supressWarnings'
import { skipWaiting, clientsClaim } from 'workbox-core'
console.log('⛪ Hello from service worker')

skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)
registerRoute(navigationRoute)
