import React, { useEffect, useState } from 'react'
import './sass/CreateChatRoom.sass'
import { useHistory } from 'react-router-dom'
import Popup from './Popup'
import { useTranslation } from 'react-i18next'

const CreateChatRoom = ({ open, CreateChatRoom }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [state, setState] = useState({ name: '', description: '' })
  const close = () => {
    history.goBack()
  }

  const HandlerCreateChatRoom = async () => {
    CreateChatRoom(state)
    // let respuesta = await apiRequest('chatRooms/createChatRoom', { state }, 'POST')
    // console.log(respuesta)
  }

  const HandleChange = e => {
    setState({ ...state, [e.target.id]: e.target.value })
  }
  return (
    <Popup open={open} close={close}>
      <div className='ContainerCreateChatRooms'>
        <h2 className='Contenedor__Title'>
          {t('CreateChatRoom.title1')}
          <br />
          {t('CreateChatRoom.title2')}
        </h2>
        <label htmlFor='name'>{t('CreateChatRoom.name')}</label>
        <div className='Contenedor__Theinput'>
          <input
            id='name'
            placeholder={t('CreateChatRoom.name_placeholder')}
            type='text'
            value={state.name}
            onChange={e => HandleChange(e)}
          />
        </div>
        <label htmlFor='description'>{t('CreateChatRoom.description')}</label>
        <div className='Contenedor__Theinput'>
          <input
            id='description'
            placeholder={t('CreateChatRoom.description_placeholder')}
            type='text'
            value={state.description}
            onChange={e => HandleChange(e)}
          />
        </div>
        <button className='btn blue Contenedor__Button' onClick={HandlerCreateChatRoom}>
          {t('CreateChatRoom.create')}
          {/* Create */}
        </button>
      </div>
    </Popup>
  )
}

export default CreateChatRoom
