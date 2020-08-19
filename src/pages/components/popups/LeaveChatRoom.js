import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import apiRequest from '../../../apiRequest'
import Popup from './Popup'
import './sass/LeaveChatRoom.sass'
import { P_IconCopy } from '../../../icons'
import { useTranslation } from 'react-i18next'

const LeaveChatRoom = ({ open, idChatroom, LeaveChatRoom }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const HandleLeaveChatRoom = deleteMessage => {
    LeaveChatRoom(idChatroom, deleteMessage)
    history.goBack()
  }
  const close = () => {
    history.goBack()
  }
  return (
    <Popup open={open} close={close}>
      <div className='ContainerLeaveChatRoom'>
        <h2 className='Contenedor__Title'>{t('LeaveChatRoom.title')}</h2>
        <p className={`Contenedor__parrafo`}>{t('LeaveChatRoom.are_you_sure')}</p>
        <button className='btn' onClick={() => HandleLeaveChatRoom(false)}>
          {t('LeaveChatRoom.yes')}
          {/* Yes, just leave the chatroom */}
        </button>
        <button className='btn' onClick={() => HandleLeaveChatRoom(true)}>
          {t('LeaveChatRoom.yes_and_delete_message')}
          {/* Yes, leave the chatroom and delete all my messages */}
        </button>
      </div>
    </Popup>
  )
}

export default LeaveChatRoom
