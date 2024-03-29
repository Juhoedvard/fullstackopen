import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNewUser } from '../reducers/usersReducer'

const Register = ({ handleClose }) => {


  const [register, setRegister] = useState({ username: '', name: '', password: '' })
  const dispatch = useDispatch()

  const handleRegister = (event) => {
    event.preventDefault()
    dispatch(setNewUser({
      username: register.username,
      name: register.name,
      password: register.password
    }))
    setRegister({ username: '', name: '', password: '' })
    handleClose()

  }
  const setUser =  (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  return (
    <div className=" flex flex-col flex-grow place-content-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto  ">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username:</label>
                  <input type="username" name="username" id="úsername"  value={register.username} onChange={setUser} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"/>
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                  <input type="name" name="name" id="name" placeholder="name" value={register.name} onChange={setUser} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" value={register.password} onChange={setUser} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <button type="button" onClick={handleClose} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

}

export default Register