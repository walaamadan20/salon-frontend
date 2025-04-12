import { useContext } from "react"
import { Link } from "react-router-dom"
import { authContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(authContext)

  return (
    <div>
      <ul>
        <li><Link to="/">Homepage</Link></li>

        {/* Public route: visible to both admins and customers */}
        <li><Link to="/products">All Products</Link></li>

        {user ? (
          <>
 fatema/products-ui
            <li>Welcome {user.username}</li>
            <li><button onClick={logout}>Logout</button></li>

          </>
        ) : (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar