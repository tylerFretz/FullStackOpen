import React from 'react'
import { Switch, Route } from "react-router-dom"

import useAuthUser from './hooks/useAuthUser'

import ModalSpinner from './components/ModalSpinner'
import Navigation from './components/Navigation'
import Notifications from './components/Notifications'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const { hasSyncAuth } = useAuthUser()


  if (!hasSyncAuth) 
    return <ModalSpinner />

  return (
    <div>
      <Navigation />
      <Notifications />
      <div className='container'>
        <Switch>
          <Route path='/' exact>
            <Authors />
          </Route>
          <Route path='/login' exact>
            <LoginForm />
          </Route>
          <Route path='/books' exact>
            <Books />
          </Route>
          <Route path='/new' exact>
            <BookForm />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
