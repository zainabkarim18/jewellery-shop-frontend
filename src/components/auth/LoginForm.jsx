import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = ({setUserInfo}) => {
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

      if (access && username){
        const res2 = await fetch("/api/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username}),
      });
        const data2 = await res2.json();
        console.log(data2);
        setUserInfo(data2);
      }

      navigate('/');
    } catch (error) {
      setMessage('Please enter a correct username and password. Note that both fields may be case-sensitive.');
      console.error('Login error:', error.message);
    }
    
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/">
              <button type="button">Cancel</button>
          </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
