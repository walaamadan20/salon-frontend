import axios from 'axios'
import { useContext, useEffect } from 'react'
import { authContext } from '../context/AuthContext'

function Homepage() {
  const { user } = useContext(authContext)

  useEffect(() => {
    async function callProtectedRoute() {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log("Protected route response:", response.data)
      } catch (err) {
        console.error("Error calling protected route:", err)
      }
    }

    callProtectedRoute()
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      <p>Welcome {user?.username}</p>
    </div>
  )
}

export default Homepage
