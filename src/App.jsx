import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { authContext } from './context/AuthContext'
import CreateProduct from './pages/CreateProduct'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
import Signup from './pages/Signup'

function App() {
  const { user } = useContext(authContext)

  return (
    <>
      {user && <Navbar />}

      <Routes>
        {/* If user is not logged in, show only login/signup */}
        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            {user?.isAdmin && (
              <Route path="/products/create" element={<CreateProduct />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
