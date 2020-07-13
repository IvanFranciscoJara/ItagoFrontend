import React, { useState } from 'react'
import './Adjuntar.sass'
import { IconDoubleCheck, IconSend, IconMenu, IconEquis } from '../icons'
import apiRequest from '../apiRequest'
const Adjuntar = props => {
  const [adjunto, setAdjunto] = useState(false)

  const EnviaAdjunto = () => {
    let TheInput = document.getElementById('TheInput')
    let file = ELinput.files[0]

    fetch(RESPUESTA.URL, {
      method: 'PUT',
      headers: {
        'Cache-Control': 'max-age=315360000'
      },
      body: file
    })
  }

  const fileHandler = () => {
    let file = document.getElementById('TheInput').files[0]
    if (FileReader && file) {
      var fr = new FileReader()
      fr.onload = function () {
        document.getElementById('ImagenAdjunta').src = fr.result
      }
      fr.readAsDataURL(file)
      setAdjunto(true)
    }
  }
  const CerrarVentanaAdjunta = () => {
    setAdjunto(false)
  }
  const EnviaImagen = async () => {
    let file = document.getElementById('TheInput').files[0]
    let respuesta = await apiRequest('InsertaImagen', {}, 'POST')
    let { URLgetObject, URLputObject, KEY } = respuesta
    console.log(URLgetObject, URLputObject, KEY)
    let hola = await fetch(URLputObject, {
      method: 'PUT',
      headers: {
        'Cache-Control': 'max-age=315360000'
      },
      body: file
    })
    let TextoAdjuntar = document.getElementById('TextoAdjuntar').value
    if (hola.status) {
      props.EnviarMensaje(TextoAdjuntar, { URL: URLgetObject, Nombre: file.name })
    }
    setAdjunto(false)
  }
  return (
    <div className={`ContenedorAdjuntar ${!adjunto && 'esconder'}`}>
      <div className='FondoOscuro' onClick={CerrarVentanaAdjunta}></div>
      <div className='Contenido'>
        <button className='Contenido__cerrar' onClick={CerrarVentanaAdjunta}>
          <IconEquis />
        </button>
        <img className='Imagen' id='ImagenAdjunta'></img>
        <input type='file' id='TheInput' name='TheInput' onChange={fileHandler} />
        <div className='Mensaje'>
          <input type='text' id='TextoAdjuntar'></input>
          <button onClick={EnviaImagen}>
            <IconSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Adjuntar
