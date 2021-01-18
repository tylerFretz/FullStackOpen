import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from '../store/actions/blogActions'
import { useField } from '../hooks'

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      author: author.value,
      title: title.value,
      url: url.value
    }

    dispatch(createBlog(blogObject))
    history.push('/')
  }

  return (
    <div id="blogForm-container">
      <h2>Create new blog</h2>
      <form className="blogForm" onSubmit={addBlog}>
        <div>
          <span className="blogForm-label">
            Author:
          </span>
          <span className="blogForm-input">
            <input {...author} reset="" placeholder="Enter author name" />
          </span>
        </div>
        <div>
          <span className="blogForm-label">
            Title:
          </span>
          <span className="blogForm-input">
            <input {...title} reset="" placeholder="Enter title" />
          </span>
        </div>
        <div>
          <span className="blogForm-label">
            URL:
          </span>
          <span className="blogForm-input">
            <input {...url} reset="" placeholder="Enter url" />
          </span>
        </div>
        <div>
          <button data-cy="addBlog-button" type="submit">Add blog</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm