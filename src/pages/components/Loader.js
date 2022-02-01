import React from 'react'
import './sass/Loader.sass'

const Loader = ({ text, state, className, onClick }) => {
  return (
    <button className={`btn ContenedorLoader ${state && 'loading'} ${className}`} onClick={onClick}>
      <div className="Loader"></div>
      <p>{text}</p>
    </button>
  )
}
export default Loader
