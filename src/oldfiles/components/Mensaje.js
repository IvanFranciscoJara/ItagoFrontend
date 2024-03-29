import React from 'react'
import './Mensaje.sass'
import { parseISO, format, isAfter } from 'date-fns'
import { IconDoubleCheck, IconSend, IconMenu } from '../icons'

const Mensaje = ({ Mensaje, ReplyFromMessage, UltimaRevision, Usuario, Reply }) => {
  console.log(ReplyFromMessage)
  return (
    <div className={`ContenedorMensaje ${Mensaje.Tipo}`} id={Mensaje.Hora}>
      <div className='Contenido'>
        <div className='Reply'>
          <p onClick={() => Reply(Mensaje.Tipo, Mensaje.Hora, Mensaje.Mensaje)}>Reply</p>
        </div>
        {ReplyFromMessage && (
          <div className='TheReplyFromMessage'>
            <p>{ReplyFromMessage.Tipo === 'ENVIADO' ? 'Me' : Usuario}</p>
            <p>{ReplyFromMessage.Mensaje}</p>
          </div>
        )}
        <div className='TheMessage'>
          {Mensaje.ArchivoAdjunto.URL && (
            <div className='TheMessage__Image'>
              <img src={Mensaje.ArchivoAdjunto.URL}></img>
              <p>{Mensaje.ArchivoAdjunto.Nombre}</p>
            </div>
          )}
          <div className='TheMessage_MessageText'>
            <div className='TheMessage__MessageText_Message'>{Mensaje.Mensaje}</div>
            <div className='TheMessage__MessageText_TimeAndViewed'>
              {format(Mensaje.Hora, 'h:mm a')}
              {Mensaje.Tipo === 'ENVIADO' && (
                <IconDoubleCheck className={`${isAfter(UltimaRevision, Mensaje.Hora) ? 'V' : 'NV'}`} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mensaje
