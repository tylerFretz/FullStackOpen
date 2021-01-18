import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import Blog from './Blog'

const UserDetails = () => {

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? useSelector(state => state.users.find(user => user.id === userMatch.params.id))
    : null

  if (!user) return null

  const blogs = useSelector(state => state.blogs.filter(blog => blog.user.username === user.username))

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )

}

export default UserDetails