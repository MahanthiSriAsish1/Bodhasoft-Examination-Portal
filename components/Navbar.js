import React from 'react';
import './Login.css';
import bodhasoft from './BodhaSoft_logo_purple-removebg.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
     <a  href='https://bodhasoft.com/'>   <img src={bodhasoft} /></a>
      </div>
     
    </nav>
  );
};

export default Navbar;