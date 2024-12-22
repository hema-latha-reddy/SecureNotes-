/*import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';


const Login = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: name,
        password: passkey,
      });

      console.log('Backend Response:', res.data);
      alert(res.data.message || 'Login successful!');
      localStorage.setItem('token', res.data.token); // Store token for future requests
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passkey"
        name="passkey"
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        New User? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';

const Login = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: name,
        password: passkey,
      });

      console.log('Backend Response:', res.data);
      alert(res.data.message || 'Login successful!');
      localStorage.setItem('token', res.data.token); // Store token for future requests
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-header">Welcome to Secure Notes</h1>
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="text"
          name="name"
          placeholder="UserName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Passkey"
          name="passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="auth-input"
        />
        <button onClick={handleLogin} className="auth-button">
          Login
        </button>
        <p>
          New User? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/component.css';

const Login = () => {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login:', { name, passkey });
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: name,
        password: passkey,
      });

      console.log('Backend Response:', res.data);
      alert(res.data.message || 'Login successful!');
      localStorage.setItem('token', res.data.token); // Store token for future requests
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div>

      <div className="auth-container">
        <h1 className="auth-header">Welcome to Secure Notes</h1>
        <div className="auth-box">
          <h2>Login</h2>
          <input
            type="text"
            name="name"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Passkey"
            name="passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="auth-input"
          />
          <button onClick={handleLogin} className="auth-button">
            Login
          </button>
          <p>
            New User? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

