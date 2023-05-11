import React, { useContext } from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./Auth";
import ShoppingCart from './components/ShoppingCart';
import OrderTracker from './components/body/OrderTracker';
import UserOrdersBody from './components/body/UserOrdersBody';

function App() {
  const { currentUser } = useContext(AuthContext);

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
              element={currentUser ? (<UserOrdersBody />) : (<Navigate to={"/login"} />)}
            />
            <Route path="/orders/:orderId"
              element={currentUser ? (<OrderTracker />) : (<Navigate to={"/login"} />)}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
