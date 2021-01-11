const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
        const id = action.data.id
        const anecdoteToChange = state.find(a => a.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
        return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
     }
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
    
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer