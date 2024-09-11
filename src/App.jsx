
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import JewelleryList from './components/jewellery/JewelleryList';
import JewelleryDetail from './components/jewellery/JewelleryDetail';

import NavBar from "./components/partials/NavBar";
const App = () => {


  return (
    <>
   <NavBar />
    <Routes>
      <Route path="/jewelleries" element={<JewelleryList />}/>
      <Route path="/jewellery/:id" element={<JewelleryDetail />} />
    </Routes>
    </>
  );
};

export default App;
