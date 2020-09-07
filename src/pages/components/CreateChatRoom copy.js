import React, { useEffect, useState } from 'react'
import './sass/CreateChatRoom.sass'
import { useHistory } from 'react-router-dom'
import { IconEquis } from '../../Global/icons'
import apiRequest from '../../Global/apiRequest'
import Popup from './Popup'
const CreateChatRoom = ({ open, EventClose }) => {
  const history = useHistory()
  const [state, setState] = useState({ name: '', description: '' })
  const Close = () => {
    history.goBack()
  }

  const HandlerCreateChatRoom = async () => {
    let respuesta = await apiRequest('chatRooms/createChatRoom', { state }, 'POST')
    console.log(respuesta)
  }

  const HandleChange = e => {
    setState({ ...state, [e.target.id]: e.target.value })
  }
  return (
    <React.Fragment>
      <div className={`ContainerCreateChatRooms ${open && 'muestra'}`}>
        <div id='CCR_FondoOscuro' className='FondoOscuro' onClick={Close}></div>
        <div id='CCR_Contenedor' className='Contenedor'>
          <div className='Contenedor__Equis' onClick={Close}>
            <IconEquis />
          </div>
          <Popup></Popup>
          <h2 className='Contenedor__Title'>
            Create a <br />
            Private Group
          </h2>
          <label>Name of Group:</label>
          <div className='Contenedor__Theinput'>
            <input id='name' placeholder='Group 58' type='text' value={state.name} onChange={e => HandleChange(e)} />
            <span>Random</span>
          </div>
          <label>Description of Group:</label>
          <div className='Contenedor__Theinput'>
            <input
              id='description'
              placeholder='for fun group'
              type='text'
              value={state.description}
              onChange={e => HandleChange(e)}
            />
          </div>
          <button className='btn blue Contenedor__Button' onClick={HandlerCreateChatRoom}>
            CREATE
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreateChatRoom
