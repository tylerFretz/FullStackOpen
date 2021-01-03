const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get number of total blogs
blogsRouter.get('/info', async (req, res) => {
    const blogs = await Blog.find({})
    res.send(`<p>There are ${blogs.length} blogs in the database. Current time: ${new Date()}</p>`)
})

// Get all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
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
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

// Create new blog
blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        upvotes: body.upvotes
    })

    const savedBlog = await blog.save()
    res.json(savedBlog)
})

// Update existing blog
// Only allows the amount of upvotes to be updated
blogsRouter.put('/:id', async (req, res) => {
    const { upvotes } = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { upvotes }, { new: true, runValidators: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter