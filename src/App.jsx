import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';


import JewelleryList from './components/jewellery/JewelleryList';
import JewelleryDetail from './components/jewellery/JewelleryDetail';

import LoginForm from './components/auth/LoginForm';
import NavBar from "./components/partials/NavBar";
const App = () => {
 const [userInfo, setUserInfo] = useState(null);

  return (
    <>
   <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
    <Routes>
      <Route path="/jewelleries" element={<JewelleryList />}/>
      <Route path="/jewellery/:id" element={<JewelleryDetail />} />
        <Route path="/login" element={<LoginForm setUserInfo={setUserInfo}/>} />
    </Routes>
    </>
  );
};

export default App;
