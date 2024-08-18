import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/app/Home/Home';
import Cart from './pages/app/Cart/Cart';
import Orders from './pages/app/Orders/Orders';
import Login from './pages/app/Login/Login';
import Register from './pages/app/Register/Register';
import Page404 from './pages/misc/Page404/Page404';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
