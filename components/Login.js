import React, { useState } from 'react'; // Importing React and useState hook for managing state
import './Login.css'; // Importing CSS for styling the component
import logo from './Computer login-amico.png'; // Importing logo image for the login page
import axios from 'axios'; // Importing axios for making HTTP requests
import Navbar from './Navbar'; // Importing Navbar component for navigation

const Login = () => {
  // State variables for managing form inputs and messages
  const [email, setEmail] = useState(''); // State for email input
  const [rollno, setRollno] = useState(''); // State for roll number input
  const [password, setPassword] = useState(''); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [message, setMessage] = useState(''); // State for displaying messages

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the boolean value of showPassword
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Sending POST request to the backend for login
      const response = await axios.post('http://localhost:5000/api/login', {
        email, // Sending email from state
        rollno, // Sending roll number from state
        password, // Sending password from state
      });
      setMessage('Login successful'); // Display success message on successful login
      // Store the token received from the response in localStorage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      // Display alert on error (e.g., invalid credentials)
      alert("Invalid Credentials");
    }
  };

  return (
    <div className='l-mainpage'>
      {/* Navbar component for navigation */}
      <Navbar />
      <div className='l-container'>
        <div className="l-box1">
          {/* Logo image displayed on the login page */}
          <img src={logo} className='loginImg' alt="Login Illustration" />
        </div>
        <div className="l-box2">
          <div className="login-box">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={handleSubmit}>
              {/* Email input field */}
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter your email'
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  required
                />
              </div>
              {/* Roll number input field */}
              <div className="form-group">
                <label htmlFor="rollno">Roll No</label>
                <input
                  type="text"
                  placeholder='Enter your Roll number'
                  id="rollno"
                  name="rollno"
                  className="input-field"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)} // Update roll number state on change
                  required
                />
              </div>
              {/* Password input field with visibility toggle */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="password"
                    placeholder='Enter your password'
                    name="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                    required
                  />
                  {/* Button to toggle password visibility */}
                  <button type="button" onClick={togglePasswordVisibility} className="show-password-button">
                    <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                  </button>
                </div>
                {/* Link for forgotten password */}
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              {/* Submit button for the form */}
              <center>
                <button type="submit" className="sign-in-button">Sign In</button>
              </center>
            </form>
            {/* Display success message if login is successful */}
            {message && <p>{message}</p>}
            {/* Prompt for registration if user doesn't have an account */}
            <p className="register-prompt">
              Don't have an account? <a href="#" className="register-link">Register now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; // Exporting the Login component for use in other parts of the application
