import axios from 'axios'


const baseUrl = '/api/users'


let token = null

///request all the users
const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

///create a new user
const newUser = async (newObject) => {

  await axios.post(baseUrl, newObject)

}
///request the already logged in user
const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}
///remove user from localstorage
const clearUser = () => {
  window.localStorage.clear()
  token = null
}
///User remove, (never user)
const remove = async(id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
///get jwt token
const getToken = () => token



// eslint-disable-next-line import/no-anonymous-default-export
export default {  getUser, getAll, getToken, clearUser, newUser, remove }