import axios from 'axios'

const baseUrl = '/api/blogs'


let token = null

///Set userToken
const setToken = newToken =>  {
  token = `bearer ${newToken}`
}

///Get all the blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

///Create a new blog
const create = async (newObject) => {

  const config = {
    headers: { Authorization: token }
  }
  await axios.post(baseUrl, newObject, config)

}

///Like the blog
const update = async (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

///Remove the blog
const remove = async(id) => {

  return await axios.delete(`${baseUrl}/${id}`)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }