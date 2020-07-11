import React from 'react'
import './CajaTexto.sass'
import { IconDoubleCheck, IconSend, IconMenu, IconEquis } from '../icons'

const CajaTexto = props => {
  // const EnviarMensaje = () =>{
  //   props.EnviarMensaje()
  // }
  // const HandleOnFocus = () =>{
  //   props.HandleOnFocus()
  // }
  return (
    <div className='ContenedorCajaTexto'>
      <div className={`Reply ${props.replyMessage.HORAID === '' ? 'hide' : ''}`}>
        <div className='Reply__Message' id='Reply_Message'>
          <p>{props.replyMessage.USER}</p>
          <p>{props.replyMessage.MESSAGE}</p>
        </div>
        <div className='Reply__Equis' onClick={props.CancelReplyMessage}>
          <IconEquis />
        </div>
      </div>
      <div className='Mensaje'>
        <label className='Mensaje__Attach' htmlFor='TheInput'>
          {/* <button>
            <IconSend />
          </button> */}
        </label>
        <div className='Mensaje__Input'>
          <input
            id='Texto'
            onKeyUp={e => {
              e.keyCode === 13 && props.EnviarMensaje()
            }}
            onFocus={props.HandleOnFocus}
            placeholder='Escribe aqui tu mensaje ...'
          />
        </div>
        <div className='Mensaje__Boton'>
          <button onClick={() => props.EnviarMensaje()}>
            <IconSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CajaTexto
