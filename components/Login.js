import React, { useState } from 'react';
import './Login.css';
import logo from './Computer login-amico.png';
import axios, { Axios } from 'axios';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        rollno,
        password,
      });
      setMessage('Login successful');
      // Store the token in localStorage or state
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (<div className='l-mainpage'>
    {/* <div className='nav'>
   <a href='https://bodhasoft.com/'> <img src={bodhasoft} className='bodhaImg'/></a>
    </div> */}
    <Navbar/>
    <div className='l-container'>
      <div className="l-box1">
        <img src={logo} className='loginImg' alt="Login Illustration" />
      </div>
      <div className="l-box2">
     
      <div className="login-box">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter you email'
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollno">Roll No</label>
            <input
              type="text"
              placeholder='Enter your Roll number'
              id="rollno"
              name="rollno"
              className="input-field"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder='Enter your password'
                name="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="show-password-button">
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        {message && <p>{message}</p>}
        <p className="register-prompt">
          Don't have an account? <a href="#" className="register-link">Register now</a>
        </p>
      </div>
    </div>
      </div>
    </div>
    
  );
};

export default Login;
