import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/usersService'
import { createNotification } from './notificiationReducer'


const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {

      return action.payload
    },
    newUser(state, action) {

      return action.payload
    },
    DeleteUser(state, action) {

      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

///set users
export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()

    dispatch(setUsers(users))
  }
}

///Register a new user
export const setNewUser = (object) => {
  return async dispatch => {
    try{
      await usersService.newUser(object)
      const users = await usersService.getAll()
      dispatch(newUser(users))
      dispatch(createNotification('Succesfully created a new account'))
    }
    catch(e){
      dispatch(createNotification('Username or password too short'))
    }
  }
}
///Remove user (never used)
export const removeUser = (user) => {
  return async dispatch => {
    await usersService.remove(user.id)
    dispatch(DeleteUser(user.id))
  }

}




export const { setUsers , newUser, DeleteUser } = userSlice.actions
export default userSlice.reducer