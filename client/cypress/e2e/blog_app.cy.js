

describe('Blog app', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
      name: "Juho Pee",
      username: "Juhopee",
      password: "salasana"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
        
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Juhopee')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      
      cy.contains('Juhopee logged in')
    })

    it('fails with the wrong credentials', function() {
      cy.get('#username').type('Juho')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()
      
      cy.contains('Wrong username or password')
    })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.get('#username').type('Juhopee')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
  })
  

  it('A blog can be created', function() {
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Juhopeen Blogi')
      cy.get('#author').type('Juhopee')
      cy.get('#url').type('www.JuhopeeBlog.fi')
      cy.get('#create-button').click()
  })
  })

describe('When logged in and created a blog', function(){

  beforeEach(function () {
    cy.login({username: "Juhopee", password: 'salasana'})

    cy.createBlog({
      title: "Juhopeen blogi",
      author: "Juhopee",
      url: "www.juhopeenblogi.fi"
    })
  })

  it('Blog can be liked', function () {
    cy.get('#view-button').click()
    cy.get('#like-button').click()
    cy.get('#like-button').click()
    cy.get('.likes').contains(1)
  })

  it('Blog can be removed', function () {
    cy.get('#view-button').click()
    cy.get('#remove-button').click()
    cy.contains('Juhopeen blogi').should('not.exist')
  })

  it('Only the person who created the blog can see the blog', function() {
    cy.get('#view-button').click()
    cy.contains('#remove-button').click()
  })
})
})
  
