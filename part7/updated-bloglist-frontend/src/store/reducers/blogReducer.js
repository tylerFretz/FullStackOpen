const blogReducer = (state = [], action) => {
  switch (action.type) {
      case 'blogs/initBlogs':
        return action.payload
      case 'blogs/blogAdded':
        return [...state, action.payload]
      case 'blogs/blogUpvoted': {
        const newBlogs = state.map(blog => {
          return blog.id !== action.payload.id ? blog : action.payload
        })
        return newBlogs
      }
      case 'blogs/blogDeleted': {
        return state.filter(blog => blog.id !== action.payload.id)
      }
      default:
        return state
  }
}

export default blogReducer