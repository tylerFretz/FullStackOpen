import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'


test('form corectly calls event handler it recieved as props', () => {
  const input = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'https://test.com/asdf'
  }

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: input.author }
  })

  fireEvent.change(titleInput, {
    target: { value: input.title }
  })

  fireEvent.change(urlInput, {
    target: { value: input.url }
  })


  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].url).toBe('https://test.com/asdf')
})