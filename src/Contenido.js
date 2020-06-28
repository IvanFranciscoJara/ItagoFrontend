import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react'
import './Contenido.sass'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { parseISO, format, isAfter } from 'date-fns'
import { IconDoubleCheck, IconSend, IconMenu } from './icons'
import Welcome from './Welcome'
// console.log(process.env.TIPO)
// console.log(process.env.GLOBAL_URL)
console.log('de global url', GLOBAL_URL)
// const URL = 'http://localhost:3005'
const URL = GLOBAL_URL
console.log(URL)
const socket = io(URL)

// const ME_usuario = prompt('Quien Eres?')
// const ME_usuario = 'Ivan Francisco'

// const ME_idUsuario = ME_usuario

const EstadopInicial = {
  Conversaciones: [],
  UsuarioActual: -1,
  // UsuarioActual: 1,
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
      console.log(action.data)
      OldConversaciones = state.Conversaciones
      NewConversaciones = []
      action.data.forEach(USU => {
        Index = OldConversaciones.findIndex(Usuario => Usuario.idUsuario === USU.ID)
        console.log(Index)
        console.log(OldConversaciones[Index])
        if (Index === 1) {
          console.log(Index)
          NewConversaciones.push(OldConversaciones[Index])
        } else {
          NewConversaciones.push({ idUsuario: USU.ID, Usuario: USU.USUARIO, UltimaRevision: new Date(), Mensajes: [] })
        }
      })
      console.log(NewConversaciones)
      return { ...state, Conversaciones: NewConversaciones }
    case 'InsertarMensajePropio':
      NewConversaciones = state.Conversaciones
      Index = NewConversaciones.findIndex(Usuario => Usuario.idUsuario === state.UsuarioActual)
      NewConversaciones[Index].Mensajes.push({ Tipo: 'ENVIADO', Mensaje: action.Mensaje, Hora: action.Hora })
      return { ...state, Conversaciones: NewConversaciones }
    case 'InsertarMensajeRecibido':
      console.log(state)
      NewConversaciones = state.Conversaciones
      Index = NewConversaciones.findIndex(Usuario => Usuario.idUsuario === action.Origen)
      NewConversaciones[Index].Mensajes.push({ Tipo: 'RECIBIDO', Mensaje: action.Mensaje, Hora: parseISO(action.Hora) })
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

const Contenido = props => {
  console.log('comenzando render')
  const [estado, dispatch] = useReducer(reducer, EstadopInicial)
  const [Menu, setMenu] = useState(true)
  console.log(estado)
  const EnviaNick = Nombre => {
    dispatch({ type: 'IniciaLogin', idUsuario: Nombre })
    console.log(Nombre)
    socket.emit('registro', { usuario: Nombre, idUsuario: Nombre })
  }

  const EnviarMensaje = () => {
    let Index = estado.Conversaciones.findIndex(Usuario => Usuario.idUsuario === estado.UsuarioActual)
    if (Index === -1) {
      alert('Seleccion un usuario para conversar')
      return
    }
    let ElMensaje = document.getElementById('Texto').value
    let Hora = new Date()
    dispatch({ type: 'InsertarMensajePropio', Mensaje: ElMensaje, Hora: Hora })
    socket.emit('mensaje_cliente_a_cliente', { DESTINO: estado.UsuarioActual, MENSAJE: ElMensaje, HORA: Hora })

    document.getElementById('Texto').value = ''
  }
  // const EnviarMensajeEnter = e => {
  //   if (e.keyCode === 13) {
  //     EnviarMensaje()
  //   }
  // }
  const EnviarVisto = UsuarioRevisado => {
    console.log(UsuarioRevisado)
    socket.emit('usuario_revisado', { UsuarioRevisado: UsuarioRevisado, Hora: new Date() })
  }

  const HandleOnFocus = () => {
    EnviarVisto(estado.UsuarioActual)
  }

  const VerEstado = () => {
    console.log(estado)
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
      dispatch({ type: 'InsertarMensajeRecibido', Origen: data.Origen, Mensaje: data.Mensaje, Hora: data.Hora })
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

  let Index = estado.Conversaciones.findIndex(Usuario => Usuario.idUsuario === estado.UsuarioActual)
  let Conversacion = { Mensajes: [] }
  if (Index !== -1) {
    Conversacion = estado.Conversaciones[Index]
  }

  const CerrarMenu = () => {
    setMenu(!Menu)
  }
  return (
    <React.Fragment>
      <Welcome Envia={EnviaNick} />
      <div className='ContenedorContenido'>
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
            console.log(Usuario, Usuario.idUsuario, estado.DatosPropios.idUsuario)
            if (Usuario.idUsuario !== estado.DatosPropios.idUsuario) {
              return (
                <div className='Usuario' onClick={() => SeleccionarUsuario(Usuario.idUsuario)}>
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
          {Conversacion.Mensajes.map(Mensaje => {
            return (
              <div className={`Mensaje ${Mensaje.Tipo}`}>
                <div className='Mensaje__Contenido'>
                  <div className='Mensaje__Contenido__Mensaje'>{Mensaje.Mensaje}</div>
                  <div className='Mensaje__Contenido__Hora'>
                    {format(Mensaje.Hora, 'h:mm a')}
                    {Mensaje.Tipo === 'ENVIADO' && (
                      <IconDoubleCheck
                        className={`${isAfter(Conversacion.UltimaRevision, Mensaje.Hora) ? 'V' : 'NV'}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          <div className='Selecciona'>
            <img src='./imagenes/intro.jpg' />
          </div>
        </div>
        <div className='CajaTexto'>
          <div className='Input'>
            <input
              id='Texto'
              onKeyUp={e => {
                if (e.keyCode === 13) {
                  EnviarMensaje()
                }
              }}
              onFocus={HandleOnFocus}
              placeholder='Escribe aqui tu mensaje ...'
            />
          </div>
          <div className='Boton'>
            <button onClick={EnviarMensaje}>
              <IconSend />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Contenido
