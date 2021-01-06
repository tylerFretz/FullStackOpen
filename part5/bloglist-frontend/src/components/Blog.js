import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, upvoteBlog }) => {

  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none'
  }


  const upvote = event => {
    event.preventDefault()
    upvoteBlog({
      author: blog.author,
      title: blog.title,
      url: blog.url,
      upvotes: blog.upvotes + 1,
      id: blog.id
    })
  }

  const removeBlog = event => {
    event.preventDefault()
    deleteBlog({
      author: blog.author,
      title: blog.title,
      url: blog.url,
      upvotes: blog.upvotes,
      id: blog.id
    })
  }

  return (
    <li style={blogStyle}>
      <br/>
      <div>
        Title: {blog.title}
      </div>
      <div>
        Author: {blog.author}  <button onClick={() => setShowAll(!showAll)}>{showAll === false ? 'view' : 'hide'}</button>
      </div>
      {showAll === true ?
        <div>
          <div>
            URL: {blog.url}
          </div>
          <div>
            Upvotes: {blog.upvotes} <button onClick={upvote}>Like</button>
          </div>
          <div>
            <button onClick={removeBlog}>Delete</button>
          </div>
        </div>
      :
      <div/>
      }
    </li>
  )
}

export default Blog
