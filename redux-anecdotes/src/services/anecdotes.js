import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const getId = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const vote = async (id) => {
  const a = await getId(id)
  a.votes = a.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`, a)
  return response.data
}

export default { getAll, createNew, getId, vote }
