const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
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
    const authorsByCount = _.chain(blogs)
        .countBy(blog => blog.author)
        .toPairs()
        .sortBy(item => item[1])
        .reverse()
        .value()
    const returnedAuthor = {
        author: authorsByCount[0][0],
        blogs: authorsByCount[0][1]
    }
    return returnedAuthor
}

const mostLikes = (blogs) => {
    const mostLiked  = _.chain(blogs)
        .groupBy('author')
        .mapValues(author => _.sumBy(author, blog => blog.upvotes))
        .toPairs()
        .sortBy(group => group[1])
        .reverse()
        .head()
        .value()

    const result = { author: mostLiked[0], upvotes: mostLiked[1] }
    return result
}

module.exports = {
    dummy,
    totalUpvotes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}