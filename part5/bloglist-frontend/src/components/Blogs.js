import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
    return (
        <div>
            {
                blogs
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
        </div>
    )
}

export default Blogs