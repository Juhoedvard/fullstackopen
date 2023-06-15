
import blogService from '../services/blogService'
import { createSlice } from '@reduxjs/toolkit'
import { createNotification } from './notificiationReducer'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {

      return action.payload
    },
    appendBlog(state, action) {
      return action.payload
    },
    giveLike(state, action){
      const blog = action.payload.data

      return state.map(b => b.id !== blog.id ? b : blog)
    },
    deleteBlog(state, action) {

      return action.payload

    }
  }
})

///Set all the blogs
export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
///Create a new blog
export const createNewBlog = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog)
    const newBlogs = await blogService.getAll()
    dispatch(appendBlog(newBlogs))
    dispatch(createNotification(`new blog '${blog.title}' added`))
  }

}

///Like a blog
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const likedBlog = await blogService.update(id, blog)
    dispatch(giveLike(likedBlog))
    dispatch(createNotification(`You gave a like to ${blog.title}`))

  }}

///Remove a blog
export const removeBlog = (blog) => {
  return async (dispatch) => {

    await blogService.remove(blog.id)
    const newBlogList = await blogService.getAll()
    dispatch(deleteBlog(newBlogList))
    dispatch(createNotification(`Blog :'${blog.title}' removed `))
  }


}




export const { setBlogs, deleteBlog, giveLike, appendBlog } = blogSlice.actions
export default blogSlice.reducer