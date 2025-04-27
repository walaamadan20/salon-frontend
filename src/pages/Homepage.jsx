import {useContext,useEffect} from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios'

function Homepage() {

  async function callProtectedRoute(){
    const token = localStorage.getItem("token")
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(response.data)
  }

  callProtectedRoute()
  return (
    <div>
      Homepage
    </div>
  )
}

export default Homepage
