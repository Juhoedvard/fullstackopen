import { createSlice } from '@reduxjs/toolkit'




const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    isAuth(state, action){

      return action.payload
    }
  }
})

///Set auth that user can see the PrivateRoutes
export const authOn = (boolean) => {
  return async dispatch => {

    dispatch(isAuth(boolean))
  }
}

export const { isAuth } = authSlice.actions
export default authSlice.reducer