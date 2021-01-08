import React, { useState, useContext } from 'react'
import UserContext from '../UserContext'


const Blog = ({ blog, deleteBlog, upvoteBlog }) => {

  const [showAll, setShowAll] = useState(false)
  const user = useContext(UserContext)

  const belongsToUser = blog.user.username === user.username

  const toggleShowAll = () => setShowAll(!showAll)

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
      id: blog.id,
      user: blog.user.id || blog.user
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

  const displayBlog = () => {
    if(!showAll) {
      return (
        <>
          <span data-cy="title">{blog.title}</span>
          <span data-cy="author">{' -- '}{blog.author}</span>
          <div>
            <button data-cy="view-button" onClick={toggleShowAll}>view</button>
          </div>
        </>
      )
    }

    return (
      <>
        <span data-cy="title">{blog.title}</span>
        <span data-cy="author">{' -- '}{blog.author}</span>
        <div data-cy="url">
          <a href={blog.url} target="_blank" rel="noreferrer noopener">Visit Blog</a>
        </div>
        <div>
          <span data-cy="upvotes">{blog.upvotes} {blog.upvotes !== 1 ? ' Upvotes ' : ' Upvote '}</span>
          <span>
            <button type="button" onClick={upvote} data-cy="upvote-button">Upvote</button>
          </span>
        </div>
        <div>
          <span data-cy="belongsToUser">Added by: {belongsToUser ? 'You' : blog.user.name}</span>
        </div>
        <div>
          <button data-cy="view-button" onClick={toggleShowAll}>hide</button>
        </div>

        {belongsToUser && (
          <div>
            <button type="button" onClick={removeBlog} data-cy="delete-button">Delete</button>
          </div>
        )}
      </>
    )
  }

  return (
    <li className="blog" style={blogStyle}>
      {displayBlog()}
    </li>
  )
}

export default Blog
