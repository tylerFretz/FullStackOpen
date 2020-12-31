const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalUpvotes = (blogs) => {
    return blogs.reduce((total, current) => total + current.upvotes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.sort((a, b) => a.upvotes - b.upvotes)[blogs.length - 1]
}

const mostBlogs = (blogs) => {
    const 
}


module.exports = {
    dummy,
    totalUpvotes,
    favouriteBlog
}