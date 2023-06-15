import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

  const allUsers = useSelector((state) => state.users)

  return(
    <div className=' mx-auto max-w-screen-xl'>
      <h1 className="text-5xl font-extrabold dark:text-gray py-6">Users</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <th className="px-6 py-3">
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </th>
                <th className="px-6 py-3">{user.blog.length}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users