import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
  switch (action.type) {
      case 'INIT_BLOGS':
        return action.data
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'UPVOTE': {
        const id = action.data.id
        return state.map(blog => blog.id !== id ? blog : action.data)
      }
      case 'DELETE': {
        const id = action.data.id
        return state.filter(blog => blog.id !== id)
      }
      default:
        return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const upvoteBlog = blog => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      upvotes: blog.upvotes + 1
    }
    await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'UPVOTE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export default blogReducer