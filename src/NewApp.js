import React, { useState } from 'react'
import './NewApp.sass'
const App = () => {
  const [contentActive, setContentActive] = useState(true)

  const ChangeContent = () => {
    setContentActive(!contentActive)
  }

  console.log(contentActive)
  return (
    <div className='NewAppContainer'>
      <div className='Content'>
        <div className={`Content__Contacts ${contentActive && 'Show'}`}></div>
        <div className={`Content__MessageBox ${!contentActive && 'Show'}`}></div>
      </div>
      <div className='NavBar'>
        <button onClick={ChangeContent}>Change content</button>
      </div>
    </div>
  )
}

export default App
