import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { makeComment } from '../reducers/commentReducer'


const CommentForm = ({ handleClose, blogID }) => {

  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')
  const [nickname, setNickName] = useState('')

  ///Create comment to the blog
  const createComment = (event) => {
    event.preventDefault()
    dispatch(makeComment({
      comment: newComment,
      nickname: nickname,
      blogID: blogID
    } ))
    setNewComment('')
    setNickName('')
    handleClose()
  }

  return (
    <div className=" flex flex-col flex-grow place-content-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto">
      <form onSubmit={createComment}>
        <div className=" mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mx-auto max-w-screen-xl ">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 space-y-5">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment: </label>
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} id="comment" rows="10" type="text"  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
          </div>
          <div className="px-4 py-2 ">
            <label  className=" py-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname:</label>
            <input  className=" py-2 w-1/4 px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder=" Nickname..."
              value={nickname}
              onChange={e => setNickName(e.target.value)}
              type="String"
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button onClick={handleClose}type="button" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Cancel
            </button>
            <button type="submit"className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}


export default CommentForm