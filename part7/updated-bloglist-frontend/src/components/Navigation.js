import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../store/actions/loginActions'

const Navigation = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.loggedInUser)

  const handleLogout = event => {
    event.preventDefault()

    dispatch(logout())
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href='/'>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href='/'>Blogs</Nav.Link>
            <Nav.Link href='/users'>Users</Nav.Link>
            <Nav.Link href='/register'>Sign-up</Nav.Link>
            {user.token && (
              <Nav.Link href='createBlog'>Add Blog</Nav.Link>
            )}
            {!user.token && (
              <Nav.Link href='/login'>Login</Nav.Link>
            )}
          </Nav>
          {user.token && (
            <Navbar.Text>
              Signed in as: {user.username} {'     '}
              <Button onClick={handleLogout}>log out</Button>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation