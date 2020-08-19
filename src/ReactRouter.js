import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import './Global.sass'
import App from './pages/App.js'
import Chat from './pages/Chat'

// import Settings from './pages/Settings'

const ReactRouter = props => {
  // const Location = useLocation()
  // console.log('hola')
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path='/' component={App} /> */}
        <Route path='/'>
          <App />
        </Route>
        <Route path='/Welcome/:codigo'>
          <App />
        </Route>
        <Route component={Chat} />
      </Switch>
    </BrowserRouter>
  )
}

export default ReactRouter
