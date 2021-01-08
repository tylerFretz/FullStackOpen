/* eslint-disable linebreak-style */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

//expects user to be logged in and the user's details to be saved to localStorage.
Cypress.Commands.add('createBlog', ({ author, title, url }) => {


  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { author, title, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
    .then(Response => console.log(Response.body))

  cy.visit('http://localhost:3000')
})
