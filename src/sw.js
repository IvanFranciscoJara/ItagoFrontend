if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        a[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const a = document.createElement('script')
              ;(a.src = e), document.head.appendChild(a), (a.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
          return a[e]
        })
      )
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then(e => a(1 === e.length ? e[0] : e))
    },
    a = { require: Promise.resolve(s) }
  self.define = (s, o, i) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {}
        const n = { uri: location.origin + s.slice(1) }
        return Promise.all(
          o.map(s => {
            switch (s) {
              case 'exports':
                return a
              case 'module':
                return n
              default:
                return e(s)
            }
          })
        ).then(e => {
          const s = i(...e)
          return a.default || (a.default = s), a
        })
      }))
  }
}
define('./sw.js', ['./workbox-1bbb3e0e'], function (e) {
  'use strict'
  self.addEventListener('message', e => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute(
      [
        { url: 'Global.sass', revision: 'f9069091d28b7cb126df63f83d4973d1' },
        { url: 'Global/apiRequest.js', revision: 'f44d4325733481d5cfdb477addf57898' },
        { url: 'Global/i18next-config.js', revision: '9cfcd9d60368a822b0f67adb83ea626c' },
        { url: 'Global/icons.js', revision: '4c6a5e75877e8a8b61f2ed45432f184d' },
        { url: 'GlobalVars.sass', revision: '6350f6dd0b599b0241b46cd7bfe19a9a' },
        { url: 'imagenes/android-chrome-192x192.png', revision: '9bba9069adc39e15a2e44fa608447538' },
        { url: 'imagenes/android-chrome-512x512.png', revision: '7f44ab273e0ffa20cdaec8d037428211' },
        { url: 'imagenes/apple-touch-icon.png', revision: 'f568645f73739704b09747716b9c6136' },
        { url: 'imagenes/browserconfig.xml', revision: '0ad6e2054b52395414dd1da78ec37be5' },
        { url: 'imagenes/favicon-16x16.png', revision: '8bc86251ce0cdc33df3fd381f40b78b3' },
        { url: 'imagenes/favicon-32x32.png', revision: '8fdff96f2d9d721cd6d3951bab193e44' },
        { url: 'imagenes/favicon.ico', revision: '36bda15488e277c9bf207d56660d4da4' },
        { url: 'imagenes/mstile-150x150.png', revision: '49e58d919b2bf346af05023058ddf2cd' },
        { url: 'imagenes/safari-pinned-tab.svg', revision: '34bdad3462e0abbae418b0da32b9c9ed' },
        { url: 'index.html', revision: 'ad798c975a51113b809e047ad34d89be' },
        { url: 'index.js', revision: '59d5afecdf0b4e765e6334ebf67b93cb' },
        { url: 'manifest.json', revision: 'bfbd684720d62897f83310c51a02052e' },
        { url: 'newChat.js', revision: '93bc5a28e217e6d7c3839ef45c371f95' },
        { url: 'oldfiles/App.js', revision: '6384b088044b2063b75bc1b34f9b1791' },
        { url: 'oldfiles/App.sass', revision: 'c76f08ab07d4f7f4fdf302c4a0b4c585' },
        { url: 'oldfiles/components/Adjuntar.js', revision: '4136cd9c1443bceeb9dfdfd5ad40103e' },
        { url: 'oldfiles/components/Adjuntar.sass', revision: '745c26d4e05ab6ab0d055551edbb2824' },
        { url: 'oldfiles/components/CajaMensajes.js', revision: '48ba9a63fe43673891e7921b1fa9df35' },
        { url: 'oldfiles/components/CajaMensajes.sass', revision: '0ffe1195ac72162e87440c6c9f9dd659' },
        { url: 'oldfiles/components/CajaTexto.js', revision: 'd8ab4c7dc40ee1fbe02303f21cbd4980' },
        { url: 'oldfiles/components/CajaTexto.sass', revision: 'bf1ec39a300384011f46c8035bdf18c5' },
        { url: 'oldfiles/components/Mensaje.js', revision: 'd1097a330fe041be5f269fd433e57df4' },
        { url: 'oldfiles/components/Mensaje.sass', revision: '600ec65c19caeb3a8f51af9d57f21e61' },
        { url: 'oldfiles/components/NavBar.js', revision: '6ec1bbb5de465f885d4f2451fb19f136' },
        { url: 'oldfiles/components/NavBar.sass', revision: 'c70526219a245567e784ee43b671c44f' },
        { url: 'oldfiles/Welcome.js', revision: 'd44c2515bdaa6dd57b69dc256b2a67ba' },
        { url: 'oldfiles/Welcome.sass', revision: '60cad421301ba5512952a1e559e13606' },
        { url: 'pages/App.js', revision: '09f4ff34091f5edc07f7103b984c8ff4' },
        { url: 'pages/Chat.js', revision: '90602c6c4d1dbdd7fb073f7368c61d92' },
        { url: 'pages/components/ChatRooms.js', revision: 'e1411786726be62f579211c0b8f8e709' },
        { url: 'pages/components/CreateChatRoom copy.js', revision: 'c9415a841b8ade89cc2a9f21ee30dc05' },
        { url: 'pages/components/Loader.js', revision: '006e0bd7e9691744d204864d3fea3f2f' },
        { url: 'pages/components/MessagesBox.js', revision: '842723e0152f7b7eb0a0f4c80749c495' },
        { url: 'pages/components/popups/CreateChatRoom.js', revision: '4ab58ccdea494a2266002af9920deefd' },
        { url: 'pages/components/popups/CreateLink.js', revision: 'ec006b020a0b6ec851554a914ecd3ace' },
        { url: 'pages/components/popups/LeaveChatRoom.js', revision: 'f83c653d81b19642ed058d8f93b1e629' },
        { url: 'pages/components/popups/Popup.js', revision: '943780d8c3b69b23a7453abb4992bbcc' },
        { url: 'pages/components/popups/sass/CreateChatRoom.sass', revision: 'd7c049fcee3a106e8a020b8a94b6b2ac' },
        { url: 'pages/components/popups/sass/CreateLink.sass', revision: '0dcce6c2abd68bd11a2f524eb2cd06a2' },
        { url: 'pages/components/popups/sass/LeaveChatRoom.sass', revision: '50d0ccb7a1981c0c15f1439f3d3d621c' },
        { url: 'pages/components/popups/sass/Popup.sass', revision: 'bf5dd4a35b174979eaf51faedbadbbd6' },
        { url: 'pages/components/sass/ChatRooms.sass', revision: '045be6bdf9ab6ae2a257bb5642b63da5' },
        { url: 'pages/components/sass/CreateChatRoom copy.sass', revision: 'ebcfd06d1b191bc1104f704d68e9ed8f' },
        { url: 'pages/components/sass/Loader.sass', revision: 'e90ad60cb0f5ba78892c4abb1e6f6106' },
        { url: 'pages/components/sass/MessagesBox.sass', revision: 'b5791b08c828ccf094ff862af2c021c8' },
        { url: 'pages/components/sass/Settings.sass', revision: '54d50fbdaca9eea1aea2ec0e29c2ee54' },
        { url: 'pages/components/Settings.js', revision: 'c93ab67918854267bb3f280482ca3805' },
        { url: 'pages/sass/App.sass', revision: '6a7a61b9c12018d32b8469a4790bb41b' },
        { url: 'pages/sass/Chat.sass', revision: 'd41d8cd98f00b204e9800998ecf8427e' },
        { url: 'pages/sass/Welcome.sass', revision: '8c855121a2b3f4db9eed942a5e4fcead' },
        { url: 'pages/Welcome.js', revision: 'a4ffd52e9cf59f78fd85938e9c58055b' },
        { url: 'ReactRouter.js', revision: 'a407110c3fd17f6ca6879de3f061c083' }
      ],
      {}
    )
})
//# sourceMappingURL=sw.js.map
