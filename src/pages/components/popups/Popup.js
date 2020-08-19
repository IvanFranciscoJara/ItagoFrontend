import React from 'react'
import './sass/Popup.sass'
import { IconEquis } from '../../../icons'
const CreateChatRoom = props => {
  return (
    <React.Fragment>
      <div className={`ContainerPopup ${props.open && 'muestra'}`}>
        <div className='Popup__FondoOscuro' onClick={props.close}></div>
        <div className='Popup__Contenedor'>
          <div className='Popup__Contenedor__Equis' onClick={props.close}>
            <IconEquis />
          </div>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreateChatRoom
