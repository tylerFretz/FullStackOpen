const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET methods', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the first blog is about bob', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].title).toBe('How to bob')
    })

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('blog unique identifier is named id', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })
})

describe('POST methods', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            author: 'John',
            title: 'ABCD and EFG',
            url: 'https://github.com/tylerFretz123',
            upvotes: 100784
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(b => b.title)

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('ABCD and EFG')
    })

    test('a blog who\'s url already exists cannont be added', async () => {
        const newBlog = {
            author: 'John',
            title: 'ABCD and EFG',
            url: 'https://github.com/tylerFretz',
            upvotes: 100784
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('new blogs will defualt their value of upvotes to 0', async () => {
        const newBlog = {
            author: 'John',
            title: 'ABCD and EFG',
            url: 'https://github.com/tylerFretz34q344123'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[2].upvotes).toBe(0)
    })

    test('creating a blog without a url returns 400', async () => {
        const newBlog = {
            author: 'John',
            title: 'ABCD and EFG',
            upvotes: 153
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})


describe('DELETE methods', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('PUT methods', () => {
    test('a blog\'s upvotes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]

        const startUpvotes = blogToUpdate.upvotes

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ upvotes: blogToUpdate.upvotes + 1 })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const updatedBlog = blogsAtEnd[0]

        expect(updatedBlog.upvotes).toBe(startUpvotes + 1)
    })

    test('a blog\'s author cannot be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                author: 'New Author',
                title: blogToUpdate.title,
                url: blogToUpdate.url,
                upvotes: blogToUpdate.upvotes
            })

        const blogsAtEnd = await helper.blogsInDb()

        const updatedBlog = blogsAtEnd[0]

        expect(updatedBlog.author).toMatch(blogToUpdate.author)
    })
})

afterAll(() => {
    mongoose.connection.close()
})