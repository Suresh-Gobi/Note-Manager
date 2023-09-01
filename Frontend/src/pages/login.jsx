import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions';
import {useNavigate} from 'react-router-dom';
import '../assets/styles/main.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password }));
      // If login is successful, you can perform redirection here
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Handle login error
    }
  };

  return (
    <div> 
      <div className='home-background'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
