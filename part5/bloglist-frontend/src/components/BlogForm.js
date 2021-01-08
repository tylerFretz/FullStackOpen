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
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            Author:  <input id="author" type="text" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
            Title: <input id="title" type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
            URL: <input id="url" type="text" value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button id="addBlog-button" type="submit">Add blog</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm