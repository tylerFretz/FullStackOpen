import React from 'react'
import { upvoteBlog, deleteBlog } from '../store/actions/blogActions'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? useSelector(state => state.blogs.find(blog => blog.id === blogMatch.params.id))
    : null

  if (!blog) return null

  const belongsToUser = () => {
    const currentUser = useSelector(state => state.loggedInUser.username)
    return currentUser === blog.user.username
  }

  const handleUpvote = event => {
    event.preventDefault()
    dispatch(upvoteBlog({
      ...blog,
      upvotes: blog.upvotes + 1
    }))
  }

  const handleDelete = event => {
    event.preventDefault()
    dispatch(deleteBlog(blog))
    history.push('/')
  }


  return (
    <>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.upvotes} {blog.upvotes !== 1 ? 'Upvotes' : 'Upvote'} <button onClick={handleUpvote}>Upvote</button></p>
      <p>Added by {blog.user.username}</p>
      {belongsToUser && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </>
  )
}

export default BlogDetails