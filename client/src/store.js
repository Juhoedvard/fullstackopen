
import notificiationReducer from './reducers/notificiationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/usersReducer'
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import commentReducer from './reducers/commentReducer'
import authReducer from './reducers/authReducer'


const store = configureStore({ reducer: {
  blogs: blogReducer,
  notification: notificiationReducer,
  users: userReducer,
  login: loginReducer,
  comments: commentReducer,
  auth: authReducer
},  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store