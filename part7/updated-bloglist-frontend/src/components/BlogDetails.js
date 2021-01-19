import React from 'react'
import { format, compareDesc } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { upvoteBlog, deleteBlog, addComment } from '../store/actions/blogActions'
import { useField } from '../hooks'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const comment = useField('text')

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

  const handleComment = event => {
    event.preventDefault()

    if (comment.value) {
      dispatch(addComment(blog.id, comment.value))
    }
  }


  return (
    <>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.upvotes} {blog.upvotes !== 1 ? 'Upvotes ' : 'Upvote '}
        <button onClick={handleUpvote}>Upvote</button>
        {belongsToUser() && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
      <p>Added by {blog.user.username}</p>
      <h3>Comments</h3>
      <div>
        <input {...comment} reset="" placeholder='add comment' />
        <button onClick={handleComment}>submit</button>
      </div>
      <ul>
        {blog.comments.sort((a, b) =>
          compareDesc(new Date(a.date), new Date(b.date))
        )
          .map(c => (
            <li key={c._id}>
              <p>{c.body}</p>
              <p>added - {format( new Date(c.date), 'PPpp')}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default BlogDetails