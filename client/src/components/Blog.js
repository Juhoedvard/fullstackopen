import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import CommentForm from './CommentForm'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { removeComments } from '../reducers/commentReducer'


const Blog = () => {

  const dispatch = useDispatch()
  const [showModal, setShowmodal] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const userID = useSelector((state) => state.login.id)
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const comments = useSelector((state) => state.comments)
  const userComments = comments.filter(comment => comment.blog.id === id)
  if(!blog){
    return null
  }
  ///Modal close function
  const handleClose = () => {
    setShowmodal(false)
  }
  ///blog like function
  const like = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes +1 }
    dispatch(likeBlog(likedBlog))
  }
  ///blog delete function
  const remove = (blog) => {


    dispatch(removeComments(blog.id))
    dispatch(removeBlog(blog))
    navigate(-1)
  }
  const CommentSection = () => {
    if(userComments) {

      return (
        userComments.map(( comment ) => {
          return(
            <blockquote key={ comment.id} className=" overflow-x-auto shadow-md sm:rounded-lg  mx-auto max-w-screen-xl py-5 px-5 m-5">
              <p key = {comment.id} className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-gray-600"> {comment.comment}</p>
              <span className="italic font-medium leading-relaxed text-gray-900 dark:text-gray-800">- {comment.nickname}</span>
            </blockquote>)
        }))
    }
    else {
      return null
    }
  }
  return(
    <div className="mx-auto max-w-screen-xl py-5 space-y-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mx-auto max-w-screen-xl py-5 m-3">
        <table className="w-full text-sm text-left  dark:text-gray-600">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xl">Title: {blog.title}</th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-xl">Url:
                <a href={`${blog.url}`}>{blog.url}</a>
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-xl">Likes: {blog.likes} <button type="button" onClick={() => like(blog)} className="px-3 py-2 text-xs font-medium text-center text-white bg-white-700 rounded-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 dark:bg-white-600 ">
                <HandThumbUpIcon className="h-6 w-6 text-blue-500  dark:hover:bg-blue-200 sm:rounded-lg" /></button>
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-xl">Author: {blog.author}</th>
            </tr>
            {userID === blog.user.id &&
             <tr>
               <th className="px-6 py-3 text-xl"><button onClick={() => remove(blog)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Remove</button></th>
             </tr>}
          </thead>
        </table>
      </div>

      <button onClick={() => {setShowmodal(true)}}type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">
       Comment
      </button>
      {showModal && <CommentForm
        blogID={blog.id}
        handleClose = {handleClose}
      />}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-600 ">Comments:</h2>
        <CommentSection/>
      </div>
    </div>


  )
}

export default Blog