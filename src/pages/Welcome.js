import React, { useEffect } from 'react'
import './sass/Welcome.sass'
import { Itago } from '../Global/icons'
import { useTranslation } from 'react-i18next'

const Welcome = ({ Registrarse, open, codigo }) => {
  const { t } = useTranslation()
  const Cerrar = async e => {
    let Nick = document.getElementById('nick').value
    console.log(Nick)
    if (Nick.length === 0) {
      // document.getElementsByClassName('Alerta')[0].innerHTML = 'Ingresa un nick'
      let Alert = document.getElementsByClassName('Alerta')[0]
      Alert.classList.add('Red')

      var anim = Alert.animate(
        [
          { transform: 'translate3d(-1px, 0, 0)' },
          { transform: 'translate3d(2px, 0, 0)', offset: 0.2 },
          { transform: 'translate3d(-4px, 0, 0)', offset: 0.3 },
          { transform: 'translate3d(4px, 0, 0)', offset: 0.4 },
          { transform: 'translate3d(-4px, 0, 0)', offset: 0.5 },
          { transform: 'translate3d(4px, 0, 0)', offset: 0.6 },
          { transform: 'translate3d(-4px, 0, 0)', offset: 0.7 },
          { transform: 'translate3d(2px, 0, 0)', offset: 0.8 },
          { transform: 'translate3d(-1px, 0, 0)' }
        ],
        // [{ transform: 'translate3d(-1px, 0, 0)' }, { transform: 'translate3d(2px, 0, 0)' }],
        {
          duration: 700,
          iterations: 1,
          direction: 'alternate',
          fill: 'forwards'
        }
      )

      return
    }
    // document.getElementsByClassName('ContenedorWelcome')[0].classList.add('esconder')
    await Registrarse(Nick, codigo)
  }
  const EnterCerrar = e => {
    if (e.keyCode == 13) {
      Cerrar()
    }
  }

  // useEffect(() => {
  //   // console.log(localStorage.getItem('token') is null, typeof localStorage.getItem('token'))
  //   if (localStorage.getItem('token') !== null) {
  //     document.getElementsByClassName('ContenedorWelcome')[0].classList.add('esconder')
  //   }
  // }, [])

  return (
    <div className={`ContenedorWelcome ${!open && 'esconder'}`}>
      <div className='Contenido'>
        <Itago />
        <h1>Itago</h1>
        {/* <p className='slogan'>Disposable Chats</p> */}
        <p className='slogan'>{t('Welcome.slogan')}</p>
        {codigo && (
          <p className='invitacion'>
            {t('Welcome.recieve_invitation')} {codigo}
          </p>
        )}
        <input id='nick' type='text' onKeyUp={EnterCerrar} placeholder={t('Welcome.type_a_nickname')} />
        <p className='Alerta'>{t('Welcome.alert_type_a_nickname')}</p>
        <button type='button' onClick={Cerrar} className='btn'>
          {t('Welcome.entrar')}
        </button>
      </div>
    </div>
  )
}

export default Welcome
