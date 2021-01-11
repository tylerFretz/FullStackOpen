import api from "../services/api"

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
        const id = action.data.id
        return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
     }
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
    
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await api.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await api.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await api.updateVotes(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer