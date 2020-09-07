import React from 'react'
import ReactDom from 'react-dom'
// import './index.sass'
import ReactRouter from './ReactRouter.js'
import './Global/i18next-config'
// class App extends React.Component {
//   render() {
//     return <Contenido />
//   }
// }

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

ReactDom.render(<ReactRouter />, document.getElementById('app'))
