import blogService from '../../services/blogService'
import { setSuccess, setError } from './notificationActions'


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'blogs/initBlogs',
      payload: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'blogs/blogAdded',
        payload: newBlog
      })
      dispatch(setSuccess(`Added ${newBlog.title} by ${newBlog.author}.`, 5))
    }
    catch (err) {
      dispatch(setError(err.response.data.error , 5))
    }
  }
}

export const upvoteBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'blogs/blogUpdated',
        payload: updatedBlog
      })
      dispatch(setSuccess(`Upvoted ${updatedBlog.title}!`, 5))
    }
    catch (err) {
      dispatch(setError(err.response.data.error, 5))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      const deletedBlog = await blogService.remove(blog.id)
      dispatch({
        type: 'blogs/blogDeleted',
        payload: deletedBlog
      })
      dispatch(setSuccess(`Deleted ${blog.title}`, 5))
    }
    catch (err) {
      dispatch(setError(err.response.data.error, 5,))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      dispatch({
        type: 'blogs/blogUpdated',
        payload: updatedBlog
      })
      dispatch(setSuccess('Comment Added!'))
    }
    catch (err) {
      dispatch(setError(err.response.data.error, 5,))
    }
  }
}