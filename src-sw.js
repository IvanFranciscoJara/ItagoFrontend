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

self.addEventListener('push', function (e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      { action: 'explore', title: 'Explore this new world', icon: 'images/checkmark.png' },
      { action: 'close', title: 'Close', icon: 'images/xmark.png' }
    ]
  }
  e.waitUntil(self.registration.showNotification('Hello world!', options))
})

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)
registerRoute(navigationRoute)
