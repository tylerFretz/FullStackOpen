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
blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.json(blog)
        }
        else {
            res.status(404).end()
        }
    }
    catch(exception) {
        next(exception)
    }
})

// Delete blog
blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }
    catch(exception) {
        next(exception)
    }
})

// Create new blog
blogsRouter.post('/', async (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        upvotes: body.upvotes
    })

    try {
        const savedBlog = await blog.save()
        res.json(savedBlog)
    }
    catch(exception) {
        next(exception)
    }

})

// Update existing blog
blogsRouter.put('/:id', (req, res, next) => {
    const { url, upvotes } = req.body

    Blog.findByIdAndUpdate(req.params.id, { url, upvotes }, { new: true, runValidators: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(err => next(err))
})

module.exports = blogsRouter