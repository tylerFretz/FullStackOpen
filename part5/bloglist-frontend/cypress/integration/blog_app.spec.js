// Don't use arrow functions in Cypress / Mocha as per Cypress docs
// Use it.only() to run just the one test
// Declare element attributes with data-cy="" to get them regardless of code changes
// Bypass the UI using Cypress Commands (allows for faster testing)

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'TestName',
      username: 'Test',
      password: 'password'
    }

    const user2 = {
      name: 'TestName2',
      username: 'Test2',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('[data-cy=username]').type('Test')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=login-button]').click()

    cy.contains('TestName logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('[data-cy=username]').type('Test')
    cy.get('[data-cy=password]').type('wrong')
    cy.get('[data-cy=login-button]').click()

    cy.get('.error')
      .should('contain', 'Username or password incorrect')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'TestName logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('[data-cy=username]').type('Test')
      cy.get('[data-cy=password]').type('password')
      cy.get('[data-cy=login-button]').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('cypress')
      cy.get('#title').type('a blog created by cypress')
      cy.get('#url').type('https://test.com/asdf')
      cy.get('#addBlog-button').click()

      cy.contains('a blog created by cypress')
    })

    describe('2 blogs exist', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#author').type('cypress')
        cy.get('#title').type('a blog created by cypress')
        cy.get('#url').type('https://test.com/asdf')
        cy.get('#addBlog-button').click()

        cy.login({ username: 'Test', password: 'password' })
        cy.createBlog({ author: 'test1', title: 'test1', url: 'https://test1.com/asdf' })
      })

      it('a blog can be upvoted', function() {
        cy.contains('view').click()
        cy.get('[data-cy=upvotes]').should('contain', 'Upvotes: 0')
        cy.get('[data-cy=upvote-button]').click()
        cy.get('[data-cy=upvotes]').should('contain', 'Upvotes: 1')
      })

      it('a user that created a blog can delete it', function() {
        cy.contains('view').click()
        cy.get('[data-cy=delete-button]').click()

        cy.get('.info')
          .should('contain', 'Removed a blog created by cypress')
      })
    })
  })
})

