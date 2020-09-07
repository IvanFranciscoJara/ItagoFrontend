import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './sass/Settings.sass'
// import { Route, Link, useHistory, useLocation } from 'react-router-dom'
import { P_Back } from '../../Global/icons'
// import LogOutConfirmation from './popups/LogOutConfirmation'
import { useTranslation } from 'react-i18next'

const Settings = ({ logOut }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [Theme, setTheme] = useState(1)

  const ChangeTheme = () => {
    setTheme(!Theme)
  }
  const HandleLogOut = deleteMessages => {
    var r = confirm(
      deleteMessages
        ? t('Settings.are_you_sure_delete_my_user_and_delete_message')
        : t('Settings.are_you_sure_delete_my_user')
    )
    if (r == true) {
      logOut(deleteMessages)
    }
  }

  return (
    <div className='SettingsContainer'>
      <div className='Settings__Title'>
        <div className='Settings__Title-Back' onClick={() => history.goBack()}>
          <P_Back />
        </div>
        <div className='Settings__Title-Title'>
          <p>{t('Settings.title')}</p>
        </div>
      </div>
      <div className='Settings__LeaveChatrooms'>
        <button className='btn' onClick={() => HandleLogOut(false)}>
          {t('Settings.delete_my_user')}
        </button>
        <button className='btn' onClick={() => HandleLogOut(true)}>
          {t('Settings.delete_my_user_and_delete_message')}
        </button>
      </div>
      {/* <div className='Settings__Theme'>
        <div className='Switch' onClick={ChangeTheme}>
          <div className={`Switch__Circle ${Theme ? 'left' : 'right'}`}></div>
        </div>
        <p className={Theme ? 'light' : 'dark'}>{Theme ? 'Light Mode' : 'Dark Mode'}</p>
      </div> */}
      {/* <h2>Settings</h2> */}
    </div>
  )
}

export default Settings
