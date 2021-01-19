import React from 'react'
import { Form, Button } from 'react-bootstrap'
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
    <Form onSubmit={addBlog}>
      <Form.Group controlId="formGroupTitlw">
        <Form.Label>Title</Form.Label>
        <Form.Control {...title} reset="" placeholder='Enter title' required />
      </Form.Group>

      <Form.Group controlId="formGroupAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control {...author} reset="" placeholder='Enter author name' />
      </Form.Group>

      <Form.Group controlId="formGroupUrl">
        <Form.Label>URL</Form.Label>
        <Form.Control {...url} reset="" placeholder="Enter url" required />
      </Form.Group>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default BlogForm