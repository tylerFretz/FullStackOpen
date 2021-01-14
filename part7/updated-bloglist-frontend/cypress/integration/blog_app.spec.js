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
    cy.contains('login')
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

  it('blogs are ordered according to upvotes', function() {
    cy.contains('login').click()
    cy.get('[data-cy=username]').type('Test')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=login-button]').click()
    cy.wait(500)
    cy.login ({ username: 'Test', password: 'password' })
    cy.createBlog({ author: 'author1', title: 'title1', url: 'https://url1.com' })
    cy.createBlog({ author: 'author2', title: 'title2', url: 'https://url2.com' })
    cy.createBlog({ author: 'author3', title: 'title3', url: 'https://url3.com' })

    cy.wait(1000)

    cy.get('[data-cy=view-button]').then( buttons => {
      cy.wrap(buttons).click({ multiple: true })
    })

    cy.get('ul>li').eq(0)
      .get('[data-cy=title]')
      .should('contain', 'title1')

    cy.get('[data-cy=upvote-button]')
      .then(buttons => {
        cy.wrap(buttons[2]).click()
      })

    cy.wait(500)

    cy.get('ul>li').eq(0)
      .get('[data-cy=title]')
      .should('contain', 'title3')
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

    describe('2 blogs exist created by 2 different users', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#author').type('cypress')
        cy.get('#title').type('a blog created by cypress')
        cy.get('#url').type('https://test.com/asdf')
        cy.get('#addBlog-button').click()

        cy.contains('Logout').click()

        cy.contains('login').click()
        cy.get('[data-cy=username]').type('Test2')
        cy.get('[data-cy=password]').type('password')
        cy.get('[data-cy=login-button]').click()

        cy.contains('new blog').click()
        cy.get('#author').type('cypress2')
        cy.get('#title').type('a blog created by cypress2')
        cy.get('#url').type('https://test2.com/asdf')
        cy.get('#addBlog-button').click()
        cy.wait(500)
        cy.reload()
      })

      it('a blog can be upvoted', function() {
        cy.contains('view').click()
        cy.get('[data-cy=upvotes]').should('contain', '0')
        cy.get('[data-cy=upvote-button]').click()
        cy.get('[data-cy=upvotes]').should('contain', '1')
      })

      it('a user that created a blog can delete it', function() {
        cy.get('ul>li').eq(1)
          .contains('view')
          .click()

        cy.get('[data-cy=delete-button]').click()

        cy.get('.info')
          .should('contain', 'Removed a blog created by cypress2')
      })

      it('a user that did not create a blog cant delete it', function() {
        cy.get('ul>li').eq(0)
          .contains('view')
          .click()

        cy.get('.blog')
          .should('not.contain', 'Delete')
      })
    })
  })
})