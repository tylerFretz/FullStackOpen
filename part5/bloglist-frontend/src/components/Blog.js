import React from 'react'

const Blog = ({ blog }) => (
  <>
    <br/>
    <div>
      Title: {blog.title}
    </div>
    <div>
      Author: {blog.author}
    </div>
    <div>
      URL: {blog.url}
    </div>
    <div>
      Upvotes: {blog.upvotes}
    </div>
  </>
)

export default Blog
