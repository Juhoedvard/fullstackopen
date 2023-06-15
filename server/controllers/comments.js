const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({}).populate('blog')
    response.json(comments)
})

commentsRouter.post('/', async (request, response) => {

    const body = request.body
    console.log(body)
    const blog = await Blog.findById(body.blogID)
    const comment =  new Comment({
        comment: body.comment,
        nickname: body.nickname,
        blog: blog.id
    })

    const savedComment = await comment.save()
    blog.comment = blog.comment.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment)
})
commentsRouter.delete(`/:id`, async(request, response) =>{
    await Comment.deleteMany({blog: request.params.id})
    response.status(204).end()

})

module.exports = commentsRouter