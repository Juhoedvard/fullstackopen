import { Link, useNavigate } from 'react-router-dom'
import { userLogOut } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { authOn } from '../reducers/authReducer'
const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login)
  const navigate = useNavigate()
  const previousPage = () => {
    if(!navigate(-1) === '/login'){
      navigate(-1)
    }
  }
  const logOut = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(userLogOut(user))
    dispatch(authOn(false))
    navigate('/login')
  }

  if(user)
  {   return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center  mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-6">
            <button onClick={previousPage}>
              <ArrowLeftIcon className="h-6 w-6 text-blue-500 "/>
            </button>
            <Link to="/" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bloglist</Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="block pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              <Link to={`/users/${user.id}`}> {user.username} </Link>
            </span>
            <button className="block pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              onClick={logOut}>Log out</button>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700 ">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Blogs</Link>
              </li>
              <li>
                <Link to="/users" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>


  )}
}

export default Navbar