import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserInfo(null);
    navigate('/login');
  };
return(
   <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jewelleries">Jewelleries List</Link></li>
        {userInfo && (
          <>
            <li>
              <button onClick={handleLogout} className="logout-button" aria-label="Log out">Log Out</button>
            </li>
          </>
        )}
        {!userInfo && (
          <>
            <li><Link to="/signin">Sign Up</Link></li>
            <li><Link to="/login">Log In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
