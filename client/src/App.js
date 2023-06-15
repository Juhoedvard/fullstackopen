
import Blog from './components/Blog'
import Register from './components/Register'
import Login from './components/login.js'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { useEffect } from 'react'
import { getUsers } from './reducers/usersReducer'
import { getBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { alreadyLoggedIn } from './reducers/loginReducer'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { getComments } from './reducers/commentReducer'



const App = () => {

  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  ///fetch data from users, blogs, comments
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBlogs())
    dispatch(getComments())
  }, [dispatch])

  ///fetch already logged in user
  useEffect(() => {
    dispatch(alreadyLoggedIn())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /// set user
  const user = useSelector(state => state.login)

  useEffect(() => {
    if(user && pathname === '/login'){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <div className="h-screen bg-gradient-to-b ">
      <div className="flex flex-col justify-items-center items-center">

        <div className='w-full'>
          <Notification/>
          <Navbar/>
          <Routes>
            <Route element = {<ProtectedRoutes/>}>
              <Route path="/" exact element={<BlogList/>} />
              <Route path="/blogs/:id" element={<Blog/>} />
              <Route path="/users" element= {<Users/>}/>
              <Route path="/users/:id" element= {<User/>}/>
              <Route path="*" element={<p>Page not avaible</p>}/>
            </Route>
          </Routes>
          {!user &&
          <Routes>
            <Route path ="/login" element ={<Login/>}/>
            <Route path ="/register" element ={<Register/>}/>
          </Routes>
          }
        </div>
      </div>
    </div>

  )
}

export default App