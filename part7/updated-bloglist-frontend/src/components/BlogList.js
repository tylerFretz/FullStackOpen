import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default BlogList