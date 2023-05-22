import React, { useContext } from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./Auth";
import ShoppingCart from './components/ShoppingCart';
import UserOrdersBody from './components/body/UserOrdersBody';
import AdminOrdersBody from './components/body/AdminOrdersBody';

function App() {
  const { currentUser, isAdmin } = useContext(AuthContext);

  const handleOrdersNavigation = () => {
    if (currentUser) {
      if (isAdmin) {
        return <AdminOrdersBody />
      } else {
        return <UserOrdersBody />
      }
    } else {
      return <Navigate to="/" />
    }
  }

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shopping-cart"
              element={currentUser ? (<ShoppingCart />) : (<Navigate to={"/login"} />)}
            />
            <Route path="/orders"
              element={handleOrdersNavigation()}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
