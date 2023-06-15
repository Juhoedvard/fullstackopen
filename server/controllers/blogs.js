const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const query = [
    {
        path:'user',
        select: 'username name'
    },
    {
        path:'comment',
        select: 'comment nickname'
    }
]
const getTokenFrom = request =>{
    const authrorization = request.get('Authorization')
    if(authrorization && authrorization.startsWith('bearer ')){
        console.log(authrorization)
        return authrorization.replace('bearer ', '')
    }
    return null
}
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate(query)


    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const token = getTokenFrom(request)
    console.log(token,"token")

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blog = user.blog.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})
blogsRouter.delete(`/:id`, async(request, response) =>{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})
blogsRouter.put('/:id', async(request,response) =>{
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)

})

module.exports = blogsRouter