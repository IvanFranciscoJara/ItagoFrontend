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
  console.log('hola', e.data)
  var options = {
    body: 'Tienes un mensaje nuevo',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      { action: 'GotoItago', title: 'Ir a Itago', icon: 'imagenes/android-chrome-512x512.png' },
      { action: 'close', title: 'Close', icon: 'images/xmark.png' }
    ]
  }
  e.waitUntil(self.registration.showNotification('Itago', options))
})

self.addEventListener(
  'notificationclick',
  function (event) {
    event.notification.close()
    if (event.action === 'GotoItago') {
      clients.openWindow('https://www.itago.net')
      //   archiveEmail();
    }
  },
  false
)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)
registerRoute(navigationRoute)
