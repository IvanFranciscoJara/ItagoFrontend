import React from 'react'
import ReactDom from 'react-dom'
// import './index.sass'
import App from './App.js'
import NewApp from './NewApp.js'

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

ReactDom.render(<App />, document.getElementById('app'))
