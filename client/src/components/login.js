
import { useDispatch } from 'react-redux'
import {  useState } from 'react'
import { userLogIn } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import Register from './Register.js'

const Login =  () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showModal, setShowmodal] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    ///It doesn't work without await somereason?
    await dispatch(userLogIn(username, password, remember))
    setUsername('')
    setPassword('')
    navigate('/')
  }
  ///Toggle register modal
  const handleClose = () => {
    setShowmodal(false)
  }

  return (
    <div className=" h-screen flex flex-col items-center justify-center ">
      <h1 className=" italic text-5xl font-extrabold dark:text-gray py-6">Bloglist</h1>
      <h2 className="text-5xl font-extrabold dark:text-gray py-6">Log in</h2>
      <form onSubmit={handleLogin}  className="items-center">
        <div className="mb-6" >
          <label className="block mb-2 text-sm font-medium text-gray-900"> Username:</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id = "username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className="mb-6">
          <label  className="block mb-2 text-sm font-medium text-gray-900"> Password:</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id = "password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          <div className="flex items-center mb-4 mt-3 ">
            <input id="default-checkbox" type="checkbox" value=""  onClick={() => setRemember(true)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">Remember me?</label>
          </div>
        </div>
        <button id ="login-button" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">login</button>
        <button id ="register-button" type="button" onClick={() => setShowmodal(true)} className=" ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">register</button>
      </form>
      {showModal && <Register
        handleClose={handleClose}/>}
    </div>
  )
}

export default Login