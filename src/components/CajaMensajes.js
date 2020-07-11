import React from 'react'
import './CajaMensajes.sass'
import { parseISO, format, isAfter } from 'date-fns'
import { IconDoubleCheck, IconSend, IconMenu } from '../icons'
import ComponentMensaje from './Mensaje'

const CajaMensajes = props => {
  let LaConversacion = props.Conversacion
  return (
    <div className={`ContenedorCajaMensajes ${props.Index === -1 && 'intro'}`}>
      {LaConversacion.Mensajes.map(Mensaje => {
        console.log(Mensaje.ReplyFrom, typeof Mensaje.ReplyFrom)
        let ReplyFromMessage = ''
        console.log(Mensaje)
        if (typeof Mensaje.ReplyFrom != 'undefined' && Mensaje.ReplyFrom !== '') {
          console.log(LaConversacion.Mensajes, Mensaje.ReplyFrom)
          ReplyFromMessage =
            LaConversacion.Mensajes[LaConversacion.Mensajes.findIndex(Mens => Mens.Hora === Mensaje.ReplyFrom)]
        }
        return (
          <ComponentMensaje
            Mensaje={Mensaje}
            ReplyFromMessage={ReplyFromMessage}
            UltimaRevision={LaConversacion.UltimaRevision}
            Usuario={LaConversacion.Usuario}
            key={Mensaje.Hora}
            Reply={props.Reply}
          />
        )
      })}
      <div className='Selecciona'>
        <img src='./imagenes/intro.jpg' />
      </div>
    </div>
  )
}
export default CajaMensajes
