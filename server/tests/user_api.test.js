const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const tester = require('./tester')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')


beforeEach(async () =>{
    await User.deleteMany({})
    await User.insertMany(tester.users)
    // const passwordHash = await bcrypt.hash('password', 10)
    // const user = new User({käyttäjätunnus: 'root', passwordHash})

   // await user.save()
})

test('Valid user info', async() =>{

    const newUser = {
        käyttäjätunnus: 'juhopee',
        nimi: 'Juho Puumalainen',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(tester.users.length +1)
    
})


afterAll(async () => {
    await mongoose.connection.close()
  })