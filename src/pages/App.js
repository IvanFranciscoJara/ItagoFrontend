import React, { useState, useReducer, useEffect } from 'react'
import './sass/App.sass'
import io from 'socket.io-client'
import Welcome from './Welcome'
import apiRequest from '../apiRequest'
import ChatRooms from './components/ChatRooms'
import MessagesBox from './components/MessagesBox'
import Settings from './components/Settings'
import { Route, Link, useHistory, useLocation, Switch } from 'react-router-dom'

const URL = GLOBAL_URL
// const URL = GLOBAL_URL

const reducer = (state, action) => {
  switch (action.type) {
    case 'ActualizarData':
      return action.payload
    default:
      return state
  }
}

const reducerChatActual = (state, action) => {
  let id
  let Index
  switch (action.type) {
    case 'ActualizarDataConID':
      return action.payload
    case 'ActualizarData':
      console.log(state, action.payload)
      Index = action.payload.findIndex(chatRoom => chatRoom._id === state?._id)
      return Index === -1 ? undefined : action.payload[Index]
    default:
      return state
  }
}
var socket
const App = props => {
  // console.log('inicia render')
  const Location = useLocation()
  let history = useHistory()
  const [user, setUser] = useState('')
  const [view, setView] = useState('ChatRooms')
  const [chatRooms, dispatch] = useReducer(reducer, [])
  const [chatActual, dispatchChatActual] = useReducer(reducerChatActual, undefined)

  const Registrarse = async (name, code) => {
    let respuesta = await apiRequest('register/register', { name, code }, 'POST')
    localStorage.setItem('name', respuesta.name)
    localStorage.setItem('token', respuesta.token)
    localStorage.setItem('public_key', respuesta.PUBLIC_KEY)

    console.log('porque esta pasando')

    respuesta = await apiRequest('chatRooms/getdata', {}, 'POST')
    await ActualizandoData(respuesta)
    setUser(respuesta.name)
    history.push('/')
  }
  const ActualizandoData = data => {
    console.log('ACTUALIZANDO_DATA', data, '🍥')
    dispatchChatActual({ type: 'ActualizarData', payload: data })
    dispatch({ type: 'ActualizarData', payload: data })
  }
  const CambiaChatActual = nuevoId => {
    const Index = chatRooms.findIndex(chat => chat._id === nuevoId)
    // console.log(Index, chatRooms[Index])
    if (Index !== -1) {
      // console.log('holaaaaaaaaaaaaaaaaa')
      dispatchChatActual({ type: 'ActualizarDataConID', payload: chatRooms[Index] })
    }
    history.push('/messagesBox')
    setView('MessagesBox')
  }
  const closeMessageBox = () => {
    history.push('/')
  }
  const EnviaMensaje = async (message, idChatroom, replyfrom) => {
    let respuesta = await apiRequest('chatRooms/sendMessage', { message, idChatroom, replyfrom }, 'POST')
    await ActualizandoData(respuesta)
  }
  const EnviaVisto = async idChatroom => {
    let respuesta = await apiRequest('chatRooms/sendVisto', { idChatroom }, 'POST')
    await ActualizandoData(respuesta)
  }
  const CreateChatRoom = async state => {
    console.log(state)
    let respuesta = await apiRequest('chatRooms/createChatRoom', { state }, 'POST')
    await ActualizandoData(respuesta)
    history.goBack()
  }
  const LeaveChatRoom = async (idChatroom, deleteMessages) => {
    console.log(idChatroom, deleteMessages)
    let respuesta = await apiRequest('chatRooms/leaveChatRoom', { idChatroom, deleteMessages }, 'POST')
    await ActualizandoData(respuesta)
    history.push('/')
  }
  const logOut = async deleteMessages => {
    console.log(deleteMessages)
    let respuesta = await apiRequest('chatRooms/logOut', { deleteMessages }, 'POST')
    console.log(respuesta)
    // if {respuesta === 'ok'}
    let name = localStorage.getItem('name')
    localStorage.removeItem('public_key')
    localStorage.removeItem('name')
    localStorage.removeItem('token')

    alert('Your name will be delete from everywhere, we dont know whou you are anymore. Thanks you for using ItaGO.')
    window.location.reload(false)
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      console.group('useffect_SOCKETIO')
      console.log(URL)
      socket = io(URL, { transports: ['websocket'] })
      // const socket = io('ws://localhost:3000', { transports: ['websocket'] })
      socket.on('connect', async data => {
        socket.emit('registro', localStorage.getItem('token'))
      })

      socket.on('updatedata', async data => {
        console.log('conectado', data)
        console.log(data, chatActual, chatRooms)
        ActualizandoData(data)
      })

      console.groupEnd('useffect_SOCKETIO')
    }
  }, [user]) // importa el orden de los useEffect 😅
  useEffect(() => {
    var welcome = Location.pathname.substr(0, 8)
    var slash = Location.pathname.substr(8, 1)
    var path = Location.pathname.substr(9, 500)
    console.log(path)
    if (localStorage.getItem('token') === null) {
      console.log(path, slash)
      if (welcome === '/Welcome' && slash === '/') {
        history.push(Location.pathname)
      } else {
        history.push('/Welcome')
      }
    } else {
      console.log(path)
      socket.emit('registro', localStorage.getItem('token'))
      if (welcome === '/Welcome') {
        console.log('unete a:', path)
        const joinChatRoom = async () => {
          let respuesta = await apiRequest('chatRooms/joinChatRoom', { code: path }, 'POST')
          await ActualizandoData(respuesta)
        }
        joinChatRoom()
        history.push('/')
      } else {
        history.push('/')
      }
    }
  }, [])
  useEffect(() => {
    async function hola() {
      let respuesta = await apiRequest('chatRooms/getdata', {}, 'POST')
      await ActualizandoData(respuesta)
    }
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') !== null) {
      hola()
    }
  }, [])
  // useEffect(() => {
  //   CambiaChatActual('5f361d6a9738ac48460551e9')
  // }, [chatRooms])

  console.log('Estados actuales', view, chatActual, chatRooms)
  return (
    <div className='ContenedorApp'>
      {/* <Switch> */}
      <Route
        path={'/Welcome/:codigo([A-Za-z0-9]+)?'}
        children={({ match }) => {
          // console.log(Boolean(match), match, match?.params.codigo, Location)
          return <Welcome Registrarse={Registrarse} open={Boolean(match)} codigo={match?.params.codigo} />
          // <CreateChatRoom open={Boolean(match)} />
        }}
      />
      {/* </Switch> */}

      <Route
        path={'/Settings'}
        children={({ match }) => {
          // console.log(Boolean(match), match, match?.params.codigo, Location)
          return (
            //  <div className={`MessagesBox ${Boolean(match) && 'Show'}`}>
            <div className={`Settings ${Boolean(match) && 'Show'}`}>
              <Settings logOut={logOut} />
            </div>
            // </div>
          )
          // <CreateChatRoom open={Boolean(match)} />
        }}
      />

      <div
        className={`ChatRooms ${
          Location.pathname === '/' || Location.pathname === '/createChatRoom' || Location.pathname === '/Settings'
            ? 'Show'
            : ''
        }`}
      >
        <ChatRooms
          ChatRooms={chatRooms}
          CambiaChatActual={CambiaChatActual}
          CreateChatRoom={CreateChatRoom}
          OpenSettings={() => history.push('/Settings')}
        />
      </div>
      <Route
        path={'/messagesBox'}
        children={({ match }) => {
          console.log(Boolean(match), '/createChatRoom')
          return (
            <div className={`MessagesBox ${view === 'MessagesBox' && Boolean(match) ? 'Show' : null}`}>
              <MessagesBox
                closeMessageBox={closeMessageBox}
                show={Boolean(match)}
                conversation={chatActual}
                EnviaMensaje={EnviaMensaje}
                EnviaVisto={EnviaVisto}
                LeaveChatRoom={LeaveChatRoom}
              />
            </div>
          )
          // <CreateChatRoom open={Boolean(match)} />
        }}
      />
    </div>
  )
}
export default App
