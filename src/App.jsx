import React, {useEffect,  useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import JewelleryList from './components/jewellery/JewelleryList';
import JewelleryDetail from './components/jewellery/JewelleryDetail';


import OrderList from './components/order/OrderList';
import OrderDetail from './components/order/OrderDetail';

import CartDetail from './components/cart/CartDetail';

import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import NavBar from "./components/partials/NavBar";

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
  const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      setUserInfo({ accessToken, refreshToken });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <>
    <NavBar userInfo={userInfo} onLogout={handleLogout} />
    <Routes>
      <Route path="/orders" element={<OrderList/>}/>
      <Route path="/orders/:id" element={<OrderDetail/>} />
      <Route path="/jewelleries" element={<JewelleryList />}/>
      <Route path="/jewellery/:id" element={<JewelleryDetail userInfo={userInfo}/>} />
      <Route path="/cart" element={<CartDetail/>} />
      <Route path="/login" element={<LoginForm setUserInfo={setUserInfo}/>} />
      <Route path="/signup" element={<SignupForm/>} />
    </Routes>
    
    </>
  );
};

export default App;
