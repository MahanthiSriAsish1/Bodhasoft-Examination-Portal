import React, { useState } from 'react'
import "../Styles/registration.css"


const Registration = ({ onRegistration }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='imput-form'>
        <div className='name'>
          <label>Name:</label>
          <input type="text"  name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>
        <div className='email'>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className='startButton'>
          <button type='submit'>Start Test</button>
        </div>
      </div>
    </form>
  )
}

export default Registration
