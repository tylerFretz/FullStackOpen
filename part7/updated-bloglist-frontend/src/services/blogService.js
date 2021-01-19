import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = config => {
  const defaultConfig = {
    headers: { Authorization: token }
  }

  return {
    ...defaultConfig,
    ...config
  }
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const request = axios.post(baseUrl, newObject, getConfig())
  const response = await request
  return response.data
}

const update = async blog => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  const response = await request
  return response.data
}

const remove = async id => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  const response = await request
  return response.data
}

const addComment = async (id, comment) => {
  const request = axios.put(`${baseUrl}/${id}/comments`, { comment })
  const response = await request
  return response.data
}

export default { getAll, create, update, remove, addComment, setToken }