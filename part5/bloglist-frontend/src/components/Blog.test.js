import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Jest Test Author',
    title: 'Jest Test Title',
    url: 'Jest Test Url',
    upvotes: 8
  }

  const component = render(
    <Blog blog={blog} />
  )

  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Jest Test Author'
  )


  const element = component.getByText(
    'Author: Jest Test Author'
  )
  expect(element).toBeDefined()


  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Jest Test Author'
  )

})

test('renders title/author by default', () => {
  const blog = {
    author: 'Jest Test Author',
    title: 'Jest Test Title',
    url: 'Jest Test Url',
    upvotes: 8
  }

  const component = render(
    <Blog blog={blog} />
  )

  const element1 = component.getByText(
    'Author: Jest Test Author'
  )
  expect(element1).toBeDefined()

  const element2 = component.getByText(
    'Title: Jest Test Title'
  )
  expect(element2).toBeDefined()
})


test('url / upvotes are visible after view button is pressed', () => {
  const blog = {
    author: 'Jest Test Author',
    title: 'Jest Test Title',
    url: 'Jest Test Url',
    upvotes: 8,
    user: {
      id: '5ff259152ea01b1dd5de4f8d'
    }
  }

  const user = {
    id: '5ff259152ea01b1dd5de4f8d'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const element1 = component.getByText(
    'URL: Jest Test Url'
  )
  expect(element1).toBeDefined()

  const element2 = component.getByText(
    'Upvotes: 8'
  )
  expect(element2).toBeDefined()
})


test('url / upvotes are visible after view button is pressed', () => {
  const blog = {
    author: 'Jest Test Author',
    title: 'Jest Test Title',
    url: 'Jest Test Url',
    upvotes: 8,
    user: {
      id: '5ff259152ea01b1dd5de4f8d'
    }
  }

  const user = {
    id: '5ff259152ea01b1dd5de4f8d'
  }

  const upvoteBlog = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} upvoteBlog={upvoteBlog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(upvoteBlog.mock.calls).toHaveLength(2)
})