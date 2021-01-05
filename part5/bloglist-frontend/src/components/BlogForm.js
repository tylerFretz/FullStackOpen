import React from 'react'

const BlogForm = ({
    addBlog,
    author,
    title,
    url,
    onAuthorChange,
    onTitleChange,
    onUrlChange
}) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                Author:  <input type="text" value={author} onChange={onAuthorChange} />
            </div>
            <div>
                Title: <input type="text" value={title} onChange={onTitleChange} />
            </div>
            <div>
                URL: <input type="text" value={url} onChange={onUrlChange} />
            </div>
            <div>
                <button type="submit">Add blog</button>
            </div>
        </form>
    )
}

export default BlogForm