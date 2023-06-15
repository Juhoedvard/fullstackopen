import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'


const BlogForm = ({ createBlog }) => {

  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 20,
    paddingBottom: 20,
  }
  const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '', likes: 0 })
  const [createVisible, setCreateVisible] = useState(false)
  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const setBlog =  (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }
  const handleCreateblog = (event) => {
    event.preventDefault()
    setCreateVisible(false)
    dispatch(createNewBlog({
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      likes: 0
    }))
    setNewBlog({ title: '', url: '', author: '' , likes: 0 })
  }

  return (
    <div style = {blogStyle} className=' mx-auto max-w-screen-xl'>
      <div style = {hideWhenVisible}>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          id ="newBlogButton" onClick ={() => setCreateVisible(true)}>New blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit = {handleCreateblog}>
          <div className="relative z-0 w-full mb-6 group "style={{ width: '20%' }}>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Title "
              value = {newBlog.title}
              id = "title"
              type ="text"
              name ="title"
              onChange={ setBlog }
            />
          </div>
          <div className="relative z-0 w-full mb-6 group" style={{ width: '20%' }}>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Author "
              value= {newBlog.author}
              id = "author"
              type ="text"
              name ="author"
              onChange={setBlog }
            />
          </div>
          <div className="relative z-0 w-full mb-6 group" style={{ width: '20%' }}>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Url "
              value= {newBlog.url}
              id = "url"
              type ="text"
              name ="url"
              onChange={ setBlog }
            />
          </div>
          <div className="flex items-center gap-4">
            <button id ="create-button" type = "submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Create</button>
            <button type ="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick ={() => setCreateVisible(false)}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  )
}
export default BlogForm