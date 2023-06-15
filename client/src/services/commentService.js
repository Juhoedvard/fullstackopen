import axios from 'axios'

const baseUrl = '/api/comments'

///Get all the comments
const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

///Create a new comment
const create = async (newObject) => {

  const response = await axios.post(baseUrl, newObject)
  return response.data
}

///Remove comment
const remove = async (id) => {

  return await axios.delete(`${baseUrl}/${id}`)

}


// eslint-disable-next-line import/no-anonymous-default-export
export default {  getAll, create, remove }

