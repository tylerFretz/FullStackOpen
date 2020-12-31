const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get number of total blogs
blogsRouter.get('/info', (req, res) => {
    Blog.find({}).then(blogs => {
        res.send(`<p>There are ${blogs.length} blogs in the database. Current time: ${new Date()}</p>`)
    })
})

// Get all blogs
blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs.map(blog => blog.toJSON()))
    })
})

// Get individual blog
blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            blog
                ? res.json(blog)
                : res.status(404).end()
        })
        .catch(err => next(err))
})

// Delete blog
blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

// Create new blog
blogsRouter.post('/', (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        upvotes: body.upvotes
    })

    blog.save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(err => next(err))
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