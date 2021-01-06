import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  
  const handleErrorMessageClose = () => setErrorMessage(null)




  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))
      .catch(err => console.log(err))  
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }, [errorMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])




  const handleLogin = async userObject => {
    
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    }
    catch (exception) {
      setErrorMessage(
        {
          body: 'Username or password incorrect',
          type: 'error'
        }
      )
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setErrorMessage(
      {
        body: 'Logged Out',
        type: 'info'
      }
    )
  }

  const addBlog = async blogObject => {

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setErrorMessage(
        {
          body: `Added ${blogObject.title}`,
          type: 'info'
        }
      )
    }
    catch (exception) {
      setErrorMessage(
        {
          body: `${exception.response.data.error}`,
          type: 'error'
        }
      )
    }
  }

  // const removeBlog = async blogObject => {
  //   const result = window.confirm(`Delete ${blogObject.title} ?`)

  //   if (result) {
  //     try {
  //       const blog = await blogService.remove(blogObject.id)
  //       setBlogs(blogs.filter(b => b.id !== blogObject.id))
  //       setErrorMessage(
  //         {
  //           body: `Removed ${blogObject.title}`,
  //           type: 'info'
  //         }
  //       )
  //     }
  //     catch (exception) {
  //       setBlogs(blogs.filter(b => b.id !== blogObject.id))
  //       setErrorMessage(
  //         {
  //           body: `${blogObject.title} was already removed`,
  //           type: 'error'
  //         }
  //       )
  //     }
  //   }
  // }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} onClose={handleErrorMessageClose} />

      {user === null ?
        loginForm() :
        <div>
          <Logout user={user} handleLogout={handleLogout} />
          {blogForm()}
        </div>
      }

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App