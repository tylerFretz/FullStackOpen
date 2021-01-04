const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        'author': 'Bobby',
        'title': 'How to bob',
        'url': 'https://bob.com/asdf',
        'upvotes': 105
    },
    {
        'author': 'Tyler',
        'title': 'How to be an Apex Legend',
        'url': 'https://github.com/tylerFretz',
        'upvotes': 1415
    }
]

const initialUsers = [
    {
        'username': 'root',
        'name': 'rootName',
        'password': 'password'
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ author: 'Mike', title: 'Eat Grapes', url: 'https://github.com/tylerFretz234', upvotes: 1551 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
}