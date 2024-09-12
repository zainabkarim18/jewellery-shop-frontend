import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/NavBar.css'; 

const NavBar = ({ userInfo, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/jewelleries">MyJewelleryStore</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/jewelleries">Jewelleries List</Link></li>
            {userInfo ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">My Cart</Link>
                </li>
                  <li className="nav-item"><Link className="nav-link" to="/orders">Order List</Link></li>


                <li className="nav-item">
                  <button onClick={onLogout} className="btn btn-outline-light btn-sm" aria-label="Log out">Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Log In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
