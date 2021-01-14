import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'
import UserContext from './UserContext'
import ToTopScroller from './components/ToTopScroller'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const toTopScrollerRef = useRef()

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

  // Handle DOM updates depending on if the login or blogs page is shown
  useLayoutEffect(() => {
    const rootStyle = document.documentElement.style

    const handleScroll = () => {
      const { scrollTop } = document.documentElement
      const pageHeight = document.documentElement.offsetHeight
      const percentScrollTop = Math.round((scrollTop / pageHeight) * 100)

      if (!user) return

      if (percentScrollTop > 10) {
        toTopScrollerRef.current.show()
      } else {
        toTopScrollerRef.current.hide()
      }
    }

    if (user) {
      rootStyle.setProperty('--body-bg-color', 'var(--light-color)')
      window.addEventListener('scroll', handleScroll)
    } else {
      rootStyle.setProperty('--body-bg-color', 'var(--primary-color-faded)')
    }
  }, [user])




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

  const logout = event => {
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

      setErrorMessage(
        {
          body: `Removed ${blogObject.title}`,
          type: 'info'
        }
      )
    }
    catch (err) {
      setErrorMessage({
        body: `Oh no ${err}`,
        type: 'error'
      })
    }
  }

  const upvoteBlog = async (id) => {
    try {
      const blogToLike = blogs.find(blog => blog.id === id)

      if (blogToLike) {
        const updatedBlog = {
          ...blogToLike,
          upvotes: blogToLike.upvotes + 1,
          user: blogToLike.user.id
        }

        const returnedBlog = await blogService.update(id, updatedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      }
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
    <div id="root-container">
      {!user && (
        <div>
          <NavBar handleLogout={logout} message={errorMessage} onClose={handleErrorMessageClose} />
          {loginForm()}
        </div>
      )}

      {user && (
        <div>
          <UserContext.Provider value={user}>
            <NavBar handleLogout={logout} message={errorMessage} onClose={handleErrorMessageClose} />
            <div>
              {blogForm()}
              <h2>Blogs</h2>
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
                      />
                    ))
                }
              </ul>
            </div>
          </UserContext.Provider>
          <ToTopScroller ref={toTopScrollerRef} />
        </div>
      )}
    </div>
  )
}

export default App