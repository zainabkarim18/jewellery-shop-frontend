import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/token/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const { access, refresh } = data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      if (access && username) {
        const res2 = await fetch("/api/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
        const data2 = await res2.json();
        console.log(data2);
        setUserInfo(data2);
      }

      navigate('/jewelleries');
    } catch (error) {
      setMessage('Please enter a correct username and password. Note that both fields may be case-sensitive.');
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <Link to="/jewelleries">
            <button type="button" className="btn btn-secondary">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
};

export default LoginForm;
