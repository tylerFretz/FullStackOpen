import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none'
  }

  return (
    <li className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link>
      -- {blog.upvotes} upvotes
    </li>
  )
}

export default Blog
