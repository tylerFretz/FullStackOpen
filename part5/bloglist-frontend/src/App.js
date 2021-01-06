import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  
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

    blogFormRef.current.toggleVisibility()

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

  const deleteBlog = async blogObject => {
    try {
      const result = window.confirm(`Remove ${blogObject.title}?`)

      if (result) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      }
    }
    catch (err) {
      setErrorMessage({
        body: `Oh no ${err}`,
        type: 'error'
      })
    }
  }

  const upvoteBlog = async blogObject => {

    try {
      await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id)
      .concat(blogObject))
    }
    catch(exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
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

      <ul>
        {
          blogs
            .sort((a, b) => b.upvotes - a.upvotes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                upvoteBlog={upvoteBlog} 
                deleteBlog={deleteBlog}
                user={user}
              />
            ))
        }
      </ul>

    </div>
  )
}

export default App