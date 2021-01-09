import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleTitleChange = event => setTitle(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url,
      upvotes: 0
    })
    setAuthor('')
    setTitle('')
    setUrl('')
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
            <input id="author" type="text" value={author} onChange={handleAuthorChange} />
          </span>
        </div>
        <div>
          <span className="blogForm-label">
            Title:
          </span>
          <span className="blogForm-input">
            <input id="title" type="text" value={title} onChange={handleTitleChange} />
          </span>
        </div>
        <div>
          <span className="blogForm-label">
            URL:
          </span>
          <span className="blogForm-input">
            <input id="url" type="text" value={url} onChange={handleUrlChange} />
          </span>
        </div>
        <div>
          <button id="addBlog-button" type="submit">Add blog</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm