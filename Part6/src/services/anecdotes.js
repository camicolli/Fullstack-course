import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  }
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('anecdoetes are',response.data)
  return response.data
}
const getSingle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}
const createNew = async (content) => {
    console.log('CREATENEW content is', content)
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}
const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

const f = { getAll, createNew, getSingle, update}
export default f