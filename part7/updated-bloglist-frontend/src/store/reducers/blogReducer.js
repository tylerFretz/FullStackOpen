const blogReducer = (state = [], action) => {
  switch (action.type) {
      case 'blogs/initBlogs':
        return action.payload
      case 'blogs/blogAdded':
        return [...state, action.payload]
      case 'blogs/blogUpdated':
        return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
      case 'blogs/blogDeleted':
        return state.filter(blog => blog.id !== action.payload.id)
      default:
        return state
  }
}

export default blogReducer