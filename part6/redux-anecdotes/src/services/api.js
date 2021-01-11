import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const get = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVotes = async (id, updatedAnecdote) => {
    const request = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return request.data
}

export default {
    getAll,
    createNew,
    updateVotes,
    get
}

