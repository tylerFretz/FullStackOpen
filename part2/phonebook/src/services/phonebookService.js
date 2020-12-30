import axios from 'axios'
const baseUrl = '/api/phonebook'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`)


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteContact }

