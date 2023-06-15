import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import usersService from '../services/usersService'
import blogService from '../services/blogService'
import { isAuth } from './authReducer'
import { createNotification } from './notificiationReducer'


const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state,action){
      return action.payload
    },

    logout(state,action){
      return action.payload
    },
    loggedIn(state, action) {
      return action.payload
    }
  }
})

///Log in method
export const userLogIn = (username, password, remember) => {
  return async dispatch => {
    try{
      const user = await loginService.login({
        username,
        password
      })
      if(remember){
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
      }
      if(user) {

        blogService.setToken(user.token)
      }
      dispatch(login(user))
      dispatch(isAuth(true))
      dispatch(createNotification(`${username} logged in`))
    }
    catch(e){
      dispatch(createNotification('wrong credentials'))
      dispatch(login(null))
    }
  }
}
///Log out user
export const userLogOut = () => {
  return async dispatch => {
    usersService.clearUser()
    dispatch(logout(null))
    dispatch(createNotification('Logged out succesfully'))
  }
}

///get the already logged in user
export const alreadyLoggedIn = () => {
  return async dispatch => {
    const user = usersService.getUser()
    if(user) {
      blogService.setToken(user.token)
      dispatch(isAuth(true))
    }
    dispatch(loggedIn(user))

  }
}
export const { login, logout, loggedIn } = loginSlice.actions

export default loginSlice.reducer