import React from 'react'
import { InputGroup, Button, FormControl, ListGroup } from 'react-bootstrap'
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

  if (!blog) {
    history.push('/')
    return null
  }

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
      comment.reset()
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
        <label htmlFor="comment">Add comment</label>
        <InputGroup>
          <FormControl {...comment} reset="" id="comment" as="textarea" placeholder="...add comment" />
          <InputGroup.Append>
            <Button variant="secondary" onClick={handleComment}>Submit</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <ListGroup variant="flush">
        {blog.comments.sort((a, b) =>
          compareDesc(new Date(a.date), new Date(b.date))
        )
          .map(c => (
            <ListGroup.Item key={c._id}>{c.body} <small>added {format( new Date(c.date), 'PPpp')}</small></ListGroup.Item>
          ))}
      </ListGroup>
    </>
  )
}

export default BlogDetails