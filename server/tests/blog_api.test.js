const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const tester = require('./tester')

const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(tester.blogs)
    
})
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All the blogs returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(tester.blogs.length)
})

test('Identifier is id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(b => {
        expect(b.id).toBeDefined()
    })
   /// expect(response.body).toBeDefined()
})
test('Blog post worked', async() =>{

    const newBlog ={
        title: 'Juhon koodailut',
        author: 'Juho',
        url: 'http://juhonblogi.fi',
        likes: 21
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(tester.blogs.length +1 )
    
})
/*test('Blog update', async() =>{

    const id = await api.get(`/api/blogs/5a422a851b54a676234d17f7`)
    const blog ={
        title: 'React patterns are fun',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 21
    }
    await api
        .put(`/api/blogs/:${id}`)
        .set(blog)
        .expect(201)
    
    const response = await api.get('/api/blogs/:id')
    console.log(response.body[0])
   
})*/


afterAll(async () => {
  await mongoose.connection.close()
})