const usersRouter = require('express').Router()
const User = require('../models/user')
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blog')
    response.json(users)
})


usersRouter.post('/', async(request, response) =>{
    const {username, name, password} =  request.body

    console.log(request.body)

    if(username.length <4 ||  password.length < 4){
        return response.status(400).json(logger.error = 'password too short')
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user = new User ({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
    })

usersRouter.delete('/', async (request, response) => {
        const blog = await Blog.findOne({ user: request.params.id });
        await Comment.findByIdAndRemove(blog.comment.id);
        await User.findByIdAndRemove(request.params.id);
        response.status(204).end();
      });


module.exports = usersRouter