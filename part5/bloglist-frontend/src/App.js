import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import blogService from './services/blogService'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  
  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleTitleChange = event => setTitle(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)
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

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    setUsername('')
    setPassword('')
    setErrorMessage(
      {
        body: 'Logged Out',
        type: 'info'
      }
    )
  }

  //  phonebookService.create(personObject)
  //       .then(res => {
  //         console.log(res)
  //         setPersons(persons.concat(personObject))
  //         setNotification(
  //           {
  //             body: `Added ${personObject.name}`,
  //             type: 'info'
  //           }
  //         )
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setNotification(
  //           {
  //             body: `${err.response.data.error}`,
  //             type: 'error'
  //           }
  //         )
  //         console.log(err.response.data)
  //       })

  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      author: author,
      title: title,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setErrorMessage(
          {
            body: `Added ${blogObject.title}`,
            type: 'info'
          }
        )
      })
      .catch(err => {
        console.log(err)
        setErrorMessage(
          {
            body: `${err.response.data.error}`,
            type: 'error'
          }
        )
      })
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} onClose={handleErrorMessageClose} />

      {user === null ?
      <Login 
        username={username}
        password={password}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
      />
      :
      <div>
        <div>
          <span>
            <p>{user.name} logged-in</p>
          </span>
          <span>
            <Logout handleLogout={handleLogout} />
          </span>
        </div>
        <BlogForm 
          author={author}
          title={title}
          url={url}
          onAuthorChange={handleAuthorChange}
          onTitleChange={handleTitleChange}
          onUrlChange={handleUrlChange}
          addBlog={addBlog}
        />
      </div>
      }

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App