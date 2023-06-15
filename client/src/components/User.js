import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.users.find((b) => b.id === id))

  if(!blogs) {
    return null
  }

  return(
    <div className="mx-auto max-w-screen-xl">
      <h2 className="text-5xl font-extrabold dark:text-gray py-6">Your blogs</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">Title</th>
            </tr>
          </thead>
          <tbody>
            {blogs.blog.map((b) => (
              <tr key={b.id}>
                <th className="px-6 py-3">
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </th>
              </tr>)
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User