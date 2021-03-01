
describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'TestUser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Login')
  })
  describe('Login', function() {
    it('suceeds with correct credentials', function() {
      cy.get('#username').type('TestUser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Wrong user')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain','logged in')
    })

  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('TestUser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.contains('save').click()
      cy.contains('Title: title Author: author')
    })

    it('a blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.contains('save').click()
      cy.contains('Title: title Author: author')
      cy.contains('Details').click()
      cy.contains('Title: title Author: author Url: url Likes: 0')
      cy.contains('Like').click()
      cy.contains('Title: title Author: author Url: url Likes: 1')


    })
  })
})