import React, { useEffect, useState } from 'react'
import './sass/MessagesBox.sass'
import { P_IconClip, P_IconSend, IconEquis, IconDoubleCheck, P_IconShare, P_IconOut, P_Back } from '../../icons'
import apiRequest from '../../apiRequest'
import { format } from 'date-fns'
import { Route, Link, useHistory, useLocation } from 'react-router-dom'
import CreateLink from './popups/CreateLink'
import CompLeaveChatRoom from './popups/LeaveChatRoom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useTranslation } from 'react-i18next'

const MessagesBox = ({ closeMessageBox, show, conversation, EnviaMensaje, EnviaVisto, LeaveChatRoom }) => {
  const { t } = useTranslation()

  const history = useHistory()
  const [reply, setReply] = useState({
    date: 'asd',
    from: 'fromD_',
    message: 'el message'
  })

  const EnviarMensaje = props => {
    let message = document.getElementById('Texto').value
    EnviaMensaje(message, conversation._id, reply)
    document.getElementById('Texto').value = ''
    CancelReplyMessage()
  }

  // const EnviarVisto = () => {
  //   EnviaVisto(conversation._id)
  // }
  const OpenCreateLink = () => {
    history.push('./messagesBox/createLink')
  }
  const LeaveGroup = () => {
    history.push('./messagesBox/leaveChatRoom')
  }

  const OpenReplyMessage = (date, from, message) => {
    setReply({
      date: date,
      from: from,
      message: message
    })
    document.getElementById('Texto').focus()
  }
  const CancelReplyMessage = () => {
    setReply({
      date: '',
      from: '',
      message: ''
    })
  }

  const IrAReply = date => {
    console.log(date)
    let Elemento = document.getElementById(date)
    Elemento.scrollIntoView({ behavior: 'smooth' })
    var anim = Elemento.animate(
      [
        { transform: 'translate3d(-1px, 0, 0)' },
        { transform: 'translate3d(2px, 0, 0)', offset: 0.2 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.3 },
        { transform: 'translate3d(4px, 0, 0)', offset: 0.4 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.5, backgroundColor: '#aaaaaa' },
        { transform: 'translate3d(4px, 0, 0)', offset: 0.6 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.7 },
        { transform: 'translate3d(2px, 0, 0)', offset: 0.8 },
        { transform: 'translate3d(-1px, 0, 0)' }
      ],
      // [{ transform: 'translate3d(-1px, 0, 0)' }, { transform: 'translate3d(2px, 0, 0)' }],
      {
        duration: 1000,
        iterations: 1,
        direction: 'alternate',
        fill: 'forwards'
      }
    )
  }
  useEffect(() => {
    CancelReplyMessage()
  }, [])
  useEffect(() => {
    // console.log('😻', 'holaaaaaaa de messagebox')
    var objDiv = document.getElementsByClassName('ContainerMessagesBox__Messages')[0]
    if (typeof objDiv != 'undefined') {
      objDiv.scrollTop = objDiv.scrollHeight
    }
    // console.log('😻', 'chaooo de messagebox')
  }, [conversation])

  return (
    <div className='ContainerMessagesBox'>
      <Route
        path={'/messagesBox/createLink'}
        children={({ match }) => {
          // console.log(Boolean(match), '/createChatRoom', location, conversation)
          return <CreateLink open={Boolean(match)} idChatroom={conversation?._id} />
        }}
      />
      <Route
        path={'/messagesBox/leaveChatRoom'}
        children={({ match }) => {
          // console.log(Boolean(match), '/createChatRoom', location, conversation)
          return (
            <CompLeaveChatRoom open={Boolean(match)} idChatroom={conversation?._id} LeaveChatRoom={LeaveChatRoom} />
          )
        }}
      />
      {typeof conversation == 'undefined' || show === false ? (
        <div className='ContainerMessagesBox__NoMessage'>
          <p>{t('MessagesBox.select_a_chatroom_from_left')}</p>
        </div>
      ) : (
        <React.Fragment>
          <div className='ContainerMessagesBox__Title'>
            <div className='button' onClick={closeMessageBox}>
              <P_Back />
            </div>
            <div className='title'>{conversation.name}</div>
            <div className='button' onClick={OpenCreateLink}>
              <P_IconShare />
            </div>
            <div className='button' onClick={LeaveGroup}>
              <P_IconOut />
            </div>
          </div>
          <div className={`ContainerMessagesBox__Messages ${reply.from !== '' && 'padding'}`}>
            <TransitionGroup>
              {conversation.chat.map(item => {
                const position = item.tipo === 'event' ? 'center' : item.mine === true ? 'right' : 'left'
                // console.log(item.replyFrom, typeof item.replyFrom?.from != 'undefined' && item.replyFrom?.from != '')
                // console.log(item, format(new Date(item.date), 'h:mm a'))
                return (
                  <CSSTransition key={item.date} timeout={300} classNames='transition'>
                    {/* <div className='ContainerMessagesBox__Messages__Item' key={item.date}></div> */}
                    <div className='ContainerMessagesBox__Messages__Item' id={item.date}>
                      <div className={`ContainerMessagesBox__Messages__Item__Container ${position}`}>
                        {item.tipo === 'event' ? (
                          <div className='Item__Container__Event'>{item.message}</div>
                        ) : (
                          // {item.message}
                          <React.Fragment>
                            <div
                              className='Item__Container__ReplyButton'
                              onClick={() => OpenReplyMessage(item.date, item.from, item.message)}
                            >
                              <p>Reply</p>
                            </div>
                            <div className={`Item__Container__Message ${position}`}>
                              {typeof item.replyFrom?.from != 'undefined' && item.replyFrom?.from != '' && (
                                <div className='reply' onClick={() => IrAReply(item.replyFrom.date)}>
                                  <p>{item.replyFrom.from}</p>
                                  <p>{item.replyFrom.message}</p>
                                </div>
                              )}
                              <p className='from'>{item.from}</p>
                              <p>
                                {item.message}
                                <span>{format(new Date(item.date), 'h:mm a')}</span>
                              </p>
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </div>
          <div className='ContainerMessagesBox__BoxWriteMessage'>
            <div className={`ReplyMessage ${reply.from === '' && 'hide'}`}>
              <div className='ReplyMessage__Content' id='Reply_Message'>
                <p>{reply.from}</p>
                <p>{reply.message}</p>
              </div>
              <div className='ReplyMessage__Equis' onClick={CancelReplyMessage}>
                {/* equis */}
                <IconEquis />
              </div>
            </div>
            <div className='WriteMessage'>
              <div className='WriteMessage__Input'>
                <input
                  id='Texto'
                  onKeyUp={e => {
                    e.keyCode === 13 && EnviarMensaje()
                  }}
                  // onFocus={EnviarVisto}
                  placeholder='Your Message ...'
                />
              </div>
              {/* <label className='WriteMessage__Attach' htmlFor='TheInput'>
                <P_IconClip />
              </label> */}
              <label className='WriteMessage__Send' onClick={EnviarMensaje}>
                <P_IconSend />
              </label>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default MessagesBox
