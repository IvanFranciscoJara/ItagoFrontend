import React from 'react'
import './Welcome.sass'
const Welcome = props => {
  const Cerrar = e => {
    let Nick = document.getElementById('nick').value
    if (Nick.length === 0) {
      document.getElementsByClassName('Alerta')[0].innerHTML = 'Ingresa un nick'
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
    <div className='ContenedorWelcome'>
      <div className='Contenido'>
        <h1>HELLÖ</h1>
        <p>
          your first realtime <br />
          messenger
        </p>
        <input id='nick' type='text' onKeyUp={EnterCerrar} placeholder='Type a nickname' />
        <p className='Alerta'></p>
        <button type='button' onClick={Cerrar}>
          Go!
        </button>
      </div>
    </div>
  )
}

export default Welcome
