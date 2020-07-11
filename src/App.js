import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react'
import './App.sass'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { parseISO, format, isAfter } from 'date-fns'
import { IconDoubleCheck, IconSend, IconMenu } from './icons'
import Welcome from './Welcome'
import CajaTexto from './components/CajaTexto'
import CajaMensajes from './components/CajaMensajes'
import Adjuntar from './components/Adjuntar'
import apiRequest from './apiRequest'
// console.log(process.env.TIPO)
// console.log(process.env.GLOBAL_URL)
console.log('de global url', GLOBAL_URL)
const URL = 'http://localhost:3005/'
// const URL = GLOBAL_URL
console.log(URL)
const socket = io(URL, { transports: ['websocket'] })

// const ME_usuario = prompt('Quien Eres?')
// const ME_usuario = 'Ivan Francisco'

// const ME_idUsuario = ME_usuario

const EstadopInicial = {
  Conversaciones: [
    {
      idUsuario: 55,
      Usuario: 'Hugo',
      HoraRevision: new Date(),
      Mensajes: [
        {
          Hora: new Date(),
          Mensaje: 'asd',
          Tipo: 'ENVIADO'
        },
        {
          Hora: new Date(),
          Mensaje: 'asdSDSD',
          Tipo: 'RECIBIDO',
          Adjunto: {
            URL:
              'https://chatappfiles.s3.amazonaws.com/13bc3f77-97cf-42f1-bee4-a1285d932921?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI64CHDHRDPCROYXQ%2F20200711%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200711T082726Z&X-Amz-Expires=1800&X-Amz-Signature=813a17c93f5da2aabb662c9ffe8bc5a351417dd67b443004fce5f94dd5d3d234&X-Amz-SignedHeaders=host',
            Nombre: 'asdasda'
          }
        }
      ]
    }
  ],
  // UsuarioActual: -1,
  UsuarioActual: 55,
  DatosPropios: { idUsuario: '', Usuario: '' }
}
// socket.emit('registro', { usuario: ME_usuario, idUsuario: ME_idUsuario })

const reducer = (state, action) => {
  let NewConversaciones
  let OldConversaciones
  let Index
  console.log(`usando reducer: ${action.type}`)
  switch (action.type) {
    case 'SeleccionoUsuarioConversar':
      return { ...state, UsuarioActual: action.idUsuario }
    case 'LlenarUsuariosDisponibles':
      // console.log(action.data)
      // OldConversaciones = state.Conversaciones
      // NewConversaciones = []
      // action.data.forEach(USU => {
      //   Index = OldConversaciones.findIndex(Usuario => Usuario.idUsuario === USU.ID)
      //   console.log(Index)
      //   console.log(OldConversaciones[Index])
      //   if (Index === 1) {
      //     console.log(Index)
      //     NewConversaciones.push(OldConversaciones[Index])
      //   } else {
      //     NewConversaciones.push({ idUsuario: USU.ID, Usuario: USU.USUARIO, UltimaRevision: new Date(), Mensajes: [] })
      //   }
      // })
      // console.log(NewConversaciones)
      // return { ...state, Conversaciones: NewConversaciones }
      return state
    case 'InsertarMensajePropio':
      NewConversaciones = state.Conversaciones
      Index = NewConversaciones.findIndex(Usuario => Usuario.idUsuario === state.UsuarioActual)
      NewConversaciones[Index].Mensajes.push({
        Tipo: 'ENVIADO',
        Mensaje: action.Mensaje,
        Hora: action.Hora,
        ReplyFrom: action.ReplyFrom,
        ArchivoAdjunto: action.ArchivoAdjunto
      })
      return { ...state, Conversaciones: NewConversaciones }
    case 'InsertarMensajeRecibido':
      NewConversaciones = state.Conversaciones
      Index = NewConversaciones.findIndex(Usuario => Usuario.idUsuario === action.Origen)
      console.log(action)
      NewConversaciones[Index].Mensajes.push({
        Tipo: 'RECIBIDO',
        Mensaje: action.Mensaje,
        Hora: parseISO(action.Hora),
        ReplyFrom: action.ReplyFrom,
        ArchivoAdjunto: action.ArchivoAdjunto
      })
      return { ...state, Conversaciones: NewConversaciones }
    case 'UsuarioRevisoConversacion':
      NewConversaciones = state.Conversaciones
      Index = NewConversaciones.findIndex(Usuario => Usuario.idUsuario === action.UsuarioQueReviso)
      console.log('DatosUltima REvision', action.Hora, parseISO(action.Hora))
      NewConversaciones[Index].UltimaRevision = parseISO(action.Hora)
      return { ...state, Conversaciones: NewConversaciones }
    case 'IniciaLogin':
      let NewDatosPropios = { idUsuario: action.idUsuario, Usuario: action.idUsuario }
      return { ...state, DatosPropios: NewDatosPropios }
  }
}

const reducerReplyMessage = (state, action) => {
  switch (action.type) {
    case 'ResponderMensaje':
      console.log(action)
      return { TIPO: action.TIPO, USER: action.USER, HORAID: action.HORAID, MESSAGE: action.MESSAGE }
    case 'CancelarResponderMensaje':
      return { TIPO: '', USER: '', HORAID: '', MESSAGE: '' }
  }
}
const reducerAdjunto = (state, action) => {
  switch (action.type) {
    case 'LlenarAdjunto':
      return { adjunto: '', nombre: '', extension: '' }
    case 'LimpiarAdjunto':
      return { adjunto: '', nombre: '', extension: '' }
  }
}

const Contenido = props => {
  console.log('comenzando render')
  const [estado, dispatch] = useReducer(reducer, EstadopInicial)
  const [replyMessage, dispatchReplyMessage] = useReducer(reducerReplyMessage, {
    TIPO: '',
    USER: '',
    HORAID: '',
    MESSAGE: ''
  })

  // const [adjunto, dispatchAdjunto] = useReducer(reducerAdjunto, {
  //   adjunto: '',
  //   nombre: '',
  //   extension: ''
  // })
  const [Menu, setMenu] = useState(true)
  console.log(estado)
  const EnviaNick = async Nombre => {
    dispatch({ type: 'IniciaLogin', idUsuario: Nombre })
    socket.emit('registro', { usuario: Nombre, idUsuario: Nombre })
    // let respuesta = await apiRequest('InsertaImagen', {}, 'POST')
  }

  const EnviarMensaje = (TextoMensaje, Adjunto) => {
    console.log(TextoMensaje, Adjunto)
    // Adjunto && console.log('Se enviara un mensaje con algo adjunto', Adjunto.URL)
    let Index = estado.Conversaciones.findIndex(Usuario => Usuario.idUsuario === estado.UsuarioActual)

    if (Index === -1) {
      alert('Seleccion un usuario para conversar')
      return
    }

    let ElMensaje = TextoMensaje ? TextoMensaje : document.getElementById('Texto').value
    let ArchivoAdjunto = Adjunto ? { URL: Adjunto.URL, Nombre: Adjunto.Nombre } : {}
    // console.log(TextoMensaje ? TextoMensaje : document.getElementById('Texto').value)
    // let ElMensaje = document.getElementById('Texto').value

    let Hora = new Date()
    console.log(replyMessage)
    dispatch({
      type: 'InsertarMensajePropio',
      Mensaje: ElMensaje,
      Hora: Hora,
      ReplyFrom: replyMessage.HORAID,
      ArchivoAdjunto: ArchivoAdjunto
    })
    socket.emit('mensaje_cliente_a_cliente', {
      DESTINO: estado.UsuarioActual,
      MENSAJE: ElMensaje,
      HORA: Hora,
      REPLYFROM: replyMessage.HORAID,
      ARCHIVOADJUNTO: ArchivoAdjunto
    })

    document.getElementById('Texto').value = ''
  }

  const EnviarVisto = UsuarioRevisado => {
    console.log(UsuarioRevisado)
    socket.emit('usuario_revisado', { UsuarioRevisado: UsuarioRevisado, Hora: new Date() })
  }
  const HandleOnFocus = () => {
    EnviarVisto(estado.UsuarioActual)
  }

  const SeleccionarUsuario = idUsuario => {
    console.log('hola')
    dispatch({ type: 'SeleccionoUsuarioConversar', idUsuario: idUsuario })
    EnviarVisto(idUsuario)
    setMenu(!Menu)
  }

  useEffect(() => {
    socket.on('connect', data => {
      console.log('conectado', { usuario: estado.DatosPropios.usuario, idUsuario: estado.DatosPropios.idUsuario })
      socket.emit('registro', { usuario: estado.DatosPropios.usuario, idUsuario: estado.DatosPropios.idUsuario })
    })

    socket.on('mensaje_cliente_a_cliente', data => {
      console.log(data, estado)
      dispatch({
        type: 'InsertarMensajeRecibido',
        Origen: data.Origen,
        Mensaje: data.Mensaje,
        Hora: data.Hora,
        ReplyFrom: data.ReplyFrom,
        ArchivoAdjunto: data.ArchivoAdjunto
      })
    })
    socket.on('usuario_revisado', data => {
      console.log(data, estado)
      dispatch({ type: 'UsuarioRevisoConversacion', UsuarioQueReviso: data.UsuarioQueReviso, Hora: data.Hora })
    })

    socket.on('UsuariosDisponibles', data => {
      console.log(data)
      dispatch({ type: 'LlenarUsuariosDisponibles', data: data })
    })
  }, [])

  const CerrarMenu = () => {
    setMenu(!Menu)
  }
  const Reply = (Tipo, Hora, Mensaje) => {
    console.log(Tipo, Hora, Mensaje)
    let User
    if (Tipo === 'ENVIADO') {
      User = 'Me'
    } else {
      User = Conversacion.Usuario
    }
    dispatchReplyMessage({ type: 'ResponderMensaje', TIPO: Tipo, USER: User, HORAID: Hora, MESSAGE: Mensaje })
  }

  const CancelReplyMessage = () => {
    dispatchReplyMessage({ type: 'CancelarResponderMensaje' })
  }

  let Index = estado.Conversaciones.findIndex(Usuario => Usuario.idUsuario === estado.UsuarioActual)
  let Conversacion = { Mensajes: [] }
  if (Index !== -1) {
    Conversacion = estado.Conversaciones[Index]
  }

  return (
    <React.Fragment>
      <Welcome Envia={EnviaNick} />
      <Adjuntar Muestra={Adjuntar.Muestra} EnviarMensaje={EnviarMensaje} />
      <div className='ContenedorApp'>
        <div className={`FondoLateral ${Menu && 'Esconder'}`} onClick={CerrarMenu}></div>
        <div className={`Perfil ${Menu && 'Esconder'}`}>
          <p>{estado.DatosPropios.Usuario}</p>
        </div>
        <div className={`UsuariosDisponibles ${Menu && 'Esconder'}`}>
          {estado.Conversaciones.map(Usuario => {
            let Indexx = estado.Conversaciones.findIndex(Usua => Usua.idUsuario === Usuario.idUsuario)
            let Mensajess = estado.Conversaciones[Indexx].Mensajes
            let UltimoMensaje
            if (Mensajess.length === 0) {
              UltimoMensaje = ''
            } else {
              UltimoMensaje = Mensajess[Mensajess.length - 1].Mensaje
              if (UltimoMensaje.length > 40) {
                UltimoMensaje = UltimoMensaje.substring(0, 40) + '...'
              }
            }
            // console.log(Usuario, Usuario.idUsuario, estado.DatosPropios.idUsuario)
            if (Usuario.idUsuario !== estado.DatosPropios.idUsuario) {
              return (
                <div className='Usuario' onClick={() => SeleccionarUsuario(Usuario.idUsuario)} key={Usuario.Usuario}>
                  <p className='Nombre'>{Usuario.Usuario}</p>
                  <p className='UltimoMensaje'>{UltimoMensaje}</p>
                </div>
              )
            }
          })}
        </div>
        <div className={`UsuarioActual`}>
          <IconMenu className='Menu' onClick={CerrarMenu} />
          {Index === -1 ? (
            'Elige un usuario derecha para iniciar una conversación'
          ) : (
            <>
              Conversación con <strong>{Conversacion.Usuario}</strong>
            </>
          )}
        </div>
        <div className={`Mensajes ${Index === -1 && 'intro'}`}>
          <CajaMensajes Conversacion={Conversacion} Index={Index} Reply={Reply} />
        </div>
        <div className='CajaTexto'>
          <CajaTexto
            EnviarMensaje={EnviarMensaje}
            replyMessage={replyMessage}
            CancelReplyMessage={CancelReplyMessage}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
export default Contenido
