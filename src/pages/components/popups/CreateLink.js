import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import apiRequest from '../../../apiRequest'
import Popup from './Popup'
import './sass/CreateLink.sass'
import { P_IconCopy } from '../../../icons'
import { useTranslation } from 'react-i18next'
const CreateLink = ({ open, idChatroom }) => {
  const { t } = useTranslation()
  const times = [
    {
      name: t('CreateLink.t5min'),
      value: 5
    },
    {
      name: t('CreateLink.t15min'),
      value: 15
    },
    {
      name: t('CreateLink.t1hour'),
      value: 60
    },
    {
      name: t('CreateLink.t1day'),
      value: 1440
    }
  ]
  const [indexTime, setIndexTime] = useState({ index: 0, diff: 1 })
  const [link, setLink] = useState('')
  const history = useHistory()
  const close = () => {
    setLink('')
    history.goBack()
  }

  const ChangeTime = index => {
    setIndexTime({ index: index, diff: Math.abs(index - indexTime.index) })
  }
  const toClipboard = () => {
    const TheLink = document.getElementById('link')
    TheLink.select()
    document.execCommand('copy')
  }

  const newLink = () => {
    setLink('')
  }
  const getLink = async () => {
    let respuesta = await apiRequest('chatRooms/createLink', { idChatroom, time: times[indexTime.index].value }, 'POST')
    setLink(respuesta._id)
    console.log(respuesta._id)
  }
  useEffect(() => {
    let Circle = document.getElementsByClassName('PickTime_Circle')[0]
    const pos = indexTime.index * 2 + 1
    // console.log(indexTime.diff)
    var anim = Circle.animate([{ left: `calc(30px + (100% - 60px) / 8 * ${pos} - 10px)` }], {
      // duration: 150 * indexTime.diff,
      duration: 200,
      iterations: 1,
      // direction: 'alternate',
      fill: 'forwards'
    })
  }, [indexTime])
  return (
    <Popup open={open} close={close}>
      <div className='ContainerCreateLink'>
        <h2 className='Contenedor__Title'>{t('CreateLink.title')}</h2>
        <p className={`Contenedor__parrafo ${link === '' && 'Show'}`}>{t('CreateLink.pick_time_expiration')}</p>

        <div className={`Contenedor__PickTime ${link === '' && 'Show'}`}>
          <div className='PickTime_Line'></div>
          <div className='PickTime_Circle'></div>
          <div className='PickTime_Times'>
            {times.map((time, index) => (
              <div className='time' key={index} onClick={() => ChangeTime(index)}>
                <div className='time-circle'></div>
                <div className='time-name'>{time.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`Contenedor__Button ${link === '' && 'Show'}`}>
          <button className='btn' onClick={getLink}>
            {t('CreateLink.create1')}
            {times[indexTime.index].name}
            {t('CreateLink.create2')}
          </button>
        </div>
        <div className={`Contenedor__Link ${link !== '' && 'Show'}`}>
          <p>This link expire in {times[indexTime.index].name} minutes</p>
          <input id='link' value={`localhost:9000/Welcome/${link}`} readOnly />
          <button className='btn' onClick={toClipboard}>
            <P_IconCopy /> Copy to clip path
          </button>
          <button className='btn' onClick={newLink}>
            Create new link
          </button>
        </div>
        {/* )} */}
        {/* <label>Name of Group:</label>
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
        </button> */}
      </div>
    </Popup>
  )
}

export default CreateLink
