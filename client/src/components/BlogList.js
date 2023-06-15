import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import BlogForm from './BlogForm'

const Blogs = (blog) => {

  return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mx-auto max-w-screen-xl">
      <table className="w-full text-sm text-left  dark:text-gray-600 ">
        <thead>
          <tr >
            <th  className="px-6 py-3 w-1/2">
              <Link to={`/blogs/${blog.id}`}>
                <span>{blog.title} </span>
                <HandThumbUpIcon className="h-6 w-6 text-blue-500  sm:rounded-lg"></HandThumbUpIcon>{blog.likes}
              </Link>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
const BlogList = () => {

  const blogs = useSelector(( state ) => state.blogs)
  const sortBlogs =  ([...blogs].sort((a, b) => b.likes - a.likes))

  return(
    <div>
      <h2 className="self-center text-2xl text-5xl font-extrabold dark:text-gray whitespace-nowrap dark:text-gray-600 relative mx-auto max-w-screen-xl py-5">Blogs</h2>
      <BlogForm/>
      <div className='py-5'>
        {
        // eslint-disable-next-line array-callback-return
          sortBlogs.map((blog) => {
            return (
              <div className="py-2" key = {blog.id}>
                <Blogs
                  {...blog}/>
              </div>
            )
          }
          )}
      </div>
    </div>

  )}


export default BlogList