import React from 'react'
import './Welcome.sass'
const Welcome = props => {
  const Cerrar = e => {
    let Nick = document.getElementById('nick').value
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
    document.getElementsByClassName('ContenedorWelcome')[0].classList.add('esconder')
    props.Envia(Nick)
  }
  const EnterCerrar = e => {
    if (e.keyCode == 13) {
      Cerrar()
    }
  }

  return (
    <div className='ContenedorWelcome esconder'>
      <div className='Contenido'>
        <h1>HELLÖ</h1>
        <p className='slogan'>
          your first realtime <br />
          messenger
        </p>
        <input id='nick' type='text' onKeyUp={EnterCerrar} placeholder='Type a nickname' />
        <p className='Alerta'>a nickname is needed</p>
        <button type='button' onClick={Cerrar}>
          Go!
        </button>
      </div>
    </div>
  )
}

export default Welcome
