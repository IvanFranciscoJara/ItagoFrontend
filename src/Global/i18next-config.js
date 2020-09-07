import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'es',
  nonExplicitWhitelist: false,
  debug: true,
  resources: {
    es: {
      translation: {
        Welcome: {
          slogan: 'Chats Desechables',
          type_a_nickname: 'Escribe un nick',
          recieve_invitation: 'Recibiste una invitación ',
          alert_type_a_nickname: 'se necesita un nick',
          entrar: 'Entrar'
        },
        ChatRooms: {
          hi: 'Hola',
          create_chat_room: 'Crear una nueva sala de chat',
          no_chat_room: 'No estas en ninguna sala de chat, presiona el boton de arriba y crea una nueva'
        },
        MessagesBox: {
          select_a_chatroom_from_left: 'Selecciona una sala de chat de la izquierda',
          title_back: 'Volver a Salas de Chat',
          title_share: 'Compartir Sala de Chat',
          title_leave: 'Abandonar Sala de Chat'
        },
        CreateChatRoom: {
          title1: 'Creando una',
          title2: 'nueva sala de Chat',
          name: 'Nombre de la sala de chat:',
          name_placeholder: 'Equipo2020',
          description: 'Descripción de la sala de chat:',
          description_placeholder: 'sala de diversión',
          alert: 'Ingresa un nombre para la sala:',
          create: 'Crear'
        },
        CreateLink: {
          title: 'Creando una invitación',
          pick_time_expiration: 'Escoge un tiempo de expiración para el link',
          t5min: '5 min',
          t15min: '15 min',
          t1hour: '1 hora',
          t1day: '1 día',
          create1: 'Crear una invitación con ',
          create2: ' de expiracion '
        },
        LeaveChatRoom: {
          title: 'Saliendo de la sala de chat',
          are_you_sure: '¿Estas seguro que deseas salir de la sala de chat?',
          yes: 'Si, abandonar de la sala de chat',
          yes_and_delete_message: 'Si, abandonar de la sala de chat y borrar todos mis mensajes'
        },
        Settings: {
          title: 'Configuración',
          delete_my_user: 'Eliminar mi usuario',
          delete_my_user_and_delete_message: 'Eliminar mi usuario y borrar todos mis mensajes',
          are_you_sure_delete_my_user:
            '¿Estas seguro(a) que deseas eliminar tu usuario?, los mensajes que has enviado aun podran ser vistos en las salas de chat.',
          are_you_sure_delete_my_user_and_delete_message:
            '¿Estas seguro(a) que deseas eliminar tu usuario?, todos tus mensajes seran eliminados, no quedara ningun rastro de ti. 👻'
        }
      }
    }
    // en: {
    //   translation: {
    //     title: 'Disposable Chats'
    //   }
    // }
  }

  // whitelist: ['es', 'en'],
  // interpolation: {
  //   escapeValue: false
  // }
})
