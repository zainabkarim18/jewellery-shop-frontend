import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      
      <ul>
        <li><Link to="/jewelleries">Jewelleries List</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
