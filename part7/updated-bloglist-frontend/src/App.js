import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './store/actions/blogActions'
import { setUser } from './store/actions/loginActions'

import Navigation from './components/Navigation'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import UserDetails from './components/UserDetails'
import UserList from './components/UserList'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  return (
    <div className='container'>
      <Navigation />
      <Notification />

      <Switch>
        <Route path='/blogs/:id' component={BlogDetails} />
        <Route path='/users/:id' component={UserDetails} />
        <Route path='/createBlog' component={BlogForm} />
        <Route path='/register' component={RegisterForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/users' component={UserList} />
        <Route path='/' component={BlogList} />
      </Switch>

      <Footer />
    </div>
  )
}

export default App