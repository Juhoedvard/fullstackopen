import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoutes = () => {

  const auth = useSelector((state) => state.auth)
  return(
    auth ? <Outlet/> : <Navigate to="/login" replace={false}/>

  )
}



export default ProtectedRoutes