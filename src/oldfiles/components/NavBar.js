import React from 'react'
import './NavBar.sass'
import { P_IconContact, P_IconMessages } from '../icons'
const NavBar = props => {
  return (
    <div className='ContainerNavBar'>
      <div className='BackGround' onClick={props.click}>
        <div className='Item'>
          <P_IconContact />
        </div>
        <div className='Item'>
          <P_IconMessages />
        </div>
      </div>
      <div className={`Hover ${!props.content && 'Move'}`}>
        <div className='Item'>
          <P_IconContact />
        </div>
        <div className='Item'>
          <P_IconMessages />
        </div>
      </div>
    </div>
  )
}

export default NavBar
