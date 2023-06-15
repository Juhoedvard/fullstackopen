import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state,action) {
      return action.payload
    }
  }
})

const { setMessage } = notificationSlice.actions

///Create a notification
export const createNotification = (message) => {

  return async (dispatch) =>
  {
    setTimeout(() => {
      dispatch(setMessage(null))
    },3000)
    dispatch(setMessage(message))

  }
}
export default notificationSlice.reducer