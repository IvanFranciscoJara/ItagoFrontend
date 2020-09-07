import React, { useState } from 'react'
import './sass/ChatRooms.sass'
import CompCreateChatRoom from './popups/CreateChatRoom.js'
import { Route, Link, useHistory, useLocation } from 'react-router-dom'
import { IconEquis, P_Setting } from '../../Global/icons'
import { useTranslation } from 'react-i18next'

const ChatRooms = ({ ChatRooms, CambiaChatActual, CreateChatRoom, OpenSettings }) => {
  const { t } = useTranslation()
  const Location = useLocation()
  const history = useHistory()
  // console.log(ChatRooms, Location)
  const ButtonCreateChatRoom = () => {}
  const [loading, setLoading] = useState(true)
  const OpenCreateChatRoom = () => {
    history.push('./createChatRoom')
  }
  const ChangeState = () => {
    setLoading(!loading)
  }
  // ChatRooms.length !== 0 && console.log(ChatRooms[0].chat[ChatRooms[0].chat.length])
  return (
    <div className='ChatRoomsContainer'>
      <Route
        path={'/createChatRoom'}
        children={({ match }) => {
          // console.log(Boolean(match), '/createChatRoom')
          return <CompCreateChatRoom open={Boolean(match)} CreateChatRoom={CreateChatRoom} />
        }}
      />
      <div className='ChatRoomsContainer__Title'>
        <div className='ChatRoomsContainer__Title-Back' onClick={OpenSettings}>
          <P_Setting />
        </div>
        <div className='ChatRoomsContainer__Title-Title'>
          {t('ChatRooms.hi')}
          <strong>{localStorage.getItem('name')}</strong>
        </div>
      </div>
      <div className='ChatRoomsContainer__ChatRooms'>
        {ChatRooms.length !== 0 &&
          ChatRooms.map(item => (
            <div className='ChatRoom' key={item._id} onClick={() => CambiaChatActual(item._id)}>
              <div className='ChatRoom__Name'>{item.name}</div>
              <div className='ChatRoom__LastMessage'>{item.chat[item.chat.length - 1]?.message}</div>
            </div>
          ))}
        <div className='ButtonCreateChatRoom' onClick={OpenCreateChatRoom}>
          <button className='btn'>{t('ChatRooms.create_chat_room')}</button>
          {/* <Loader text={t('ChatRooms.create_chat_room')} state={loading} /> */}
        </div>
        {/* <button onClick={ChangeState}>change</button> */}
        {ChatRooms.length === 0 && (
          <div className='NoChatRooms'>
            {t('ChatRooms.no_chat_room')}
            {/* You are not in any chat room, click the button above to create a new one. */}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRooms
