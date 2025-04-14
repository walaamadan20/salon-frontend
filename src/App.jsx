
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { authContext } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import OrderList from './pages/OrderList';
import BookingsPage from './pages/BookingsPage';

// Guards
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn';
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut';


function App() {
  const { user } = useContext(authContext);

  return (
    <>
      {user && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />

        {/* Auth Routes (only if logged out) */}
        <Route element={<ValidateIsLoggedOut><Signup/></ValidateIsLoggedOut>} path="/sign-up"/>
        <Route element={<ValidateIsLoggedOut><Login/></ValidateIsLoggedOut>} path="/login"/>


      
          {/* Product-related routes */}
          <Route path="/products" element={<ValidateIsLoggedIn><ProductList /></ValidateIsLoggedIn>} />
          <Route path="/products/:productId" element={<ValidateIsLoggedIn><ProductDetails /></ValidateIsLoggedIn>} />

          {/* Admin-only routes */}
          {user?.isAdmin && (
            <>
              <Route path="/products/create" element={<ValidateIsLoggedIn><CreateProduct /></ValidateIsLoggedIn>} />
              <Route path="/products/:productId/update" element={<ValidateIsLoggedIn><UpdateProduct /></ValidateIsLoggedIn>} />
            </>
          )}

          {/* Services & Orders */}
          <Route path="/services" element={<ValidateIsLoggedIn><ServicesPage /></ValidateIsLoggedIn>} />
          <Route path="/services/:serviceId" element={<ValidateIsLoggedIn><ServiceDetailPage /></ValidateIsLoggedIn>} />
          <Route path="/orders" element={<ValidateIsLoggedIn><OrderList /></ValidateIsLoggedIn>} />
          <Route path="/bookings" element={<ValidateIsLoggedIn><BookingsPage /></ValidateIsLoggedIn>} />
       

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

export default App;
