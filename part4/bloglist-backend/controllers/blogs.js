/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


// Get number of total blogs
blogsRouter.get('/info', async (req, res) => {
    const blogs = await Blog.find({})
    res.send(`<p>There are ${blogs.length} blogs in the database. Current time: ${new Date()}</p>`)
})

// Get all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})

// Get individual blog
blogsRouter.get('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }
})

// Delete blog
blogsRouter.delete('/:id', async (req, res) => {
    const { token } = req

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).end()

    const belongsToUser = blog.user.toString() === decodedToken.id
    if (belongsToUser) {
        await blog.remove()
        return res.status(204).end()
    }
    else {
        res.status(403).json({ error: 'User is not permited to modify this resource' })
    }
})

// Create new blog
blogsRouter.post('/', async (req, res) => {
    const { body } = req
    const { token } = req

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        author: body.author || '',
        title: body.title,
        url: body.url,
        upvotes: body.upvotes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
})

// Update existing blog
// Only allows the amount of upvotes to be updated
blogsRouter.put('/:id', async (req, res) => {
    const { upvotes } = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { upvotes }, { new: true, runValidators: true })
        .populate('user', { username: 1, name: 1, id: 1 })
    res.status(201).json(updatedBlog)
})


// Add comment to existing blog
// comments are anonymous
blogsRouter.put('/:id/comments', async (req, res) => {

    if (!req.body.comment) {
        res.status(400).json({ error : 'comment missing' })
    }

    const requestBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: { body: req.body.comment, date:  new Date() } } },
        { new: true, runValidators: true })
        .populate('user', { username: 1, name: 1, id: 1 })

    res.status(requestBlog ? 200 : 404).json(requestBlog)
})


module.exports = blogsRouter