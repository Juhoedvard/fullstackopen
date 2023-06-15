import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/commentService'
import { createNotification } from './notificiationReducer'


const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      return action.payload
    },
    deleteComments(state, action){
      return action.payload
    }
  }
})

///Get all the comments
export const getComments = () => {
  return async (dispatch ) => {
    const comments = await commentService.getAll()
    dispatch(setComments(comments))
  }
}
///Make a new comment
export const makeComment = (comment) => {
  return async (dispatch) => {
    await commentService.create(comment)
    const comments = await commentService.getAll()
    dispatch(appendComment(comments))
    dispatch(createNotification('New comment created succesfully'))
  }
}
///Remove comments when the blog post is removed
export const removeComments = (id) => {
  return async dispatch => {
    await commentService.remove(id)
    const comments = commentService.getAll()
    dispatch(deleteComments(comments))
  }

}

export const { setComments, appendComment, deleteComments } = commentSlice.actions
export default commentSlice.reducer