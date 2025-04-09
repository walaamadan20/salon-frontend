import './App.css'
import {Routes ,Route} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { useContext } from 'react'
import { authContext } from './context/AuthContext'
import CreateProduct from './pages/CreateProduct'
import UpdateProduct from './pages/UpdateProduct'

function App() {

  const {user} = useContext(authContext)


  return (
          <>
          <h1>Hello</h1>
          <Navbar/>
          <Routes>
            {
              user ? (
                <>
                  <Route path="/products/create" element={<CreateProduct/>} />
                  <Route path="/products/:productId/update" element={<UpdateProduct/>} />
                </>
              ):
              (
                <>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/login" element={<Login/>}/>

          </>
    )
  }
            <Route element={<h1>Homepage</h1>} path='/'/>



</Routes>
</>
  )
}

export default App


