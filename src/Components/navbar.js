import React, { useState, useEffect } from 'react';
import "../Styles/Navbar.css";

const Navbar = ({ onSubmit }) => {
  const initialTimeInSeconds = 15 * 60; // 125 minutes converted to seconds
  const [timer, setTimer] = useState(initialTimeInSeconds);

  // Function to format seconds into HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Countdown logic using useEffect to start the timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1); // Decrease timer by 1 second
      } else {
        clearInterval(interval);
        onSubmit(); // Execute onSubmit function when timer reaches zero
      }
    }, 1000); // Runs every second (1000 milliseconds)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timer, onSubmit]); // Dependency array ensures effect runs on timer or onSubmit change

  return (
    <div className='Navbar'>
      <div className='logo'>
        <img className="bodhaLogo"src="/BodhaSoft_logo_purple-removebg.png" alt="" />
      </div>
      <div>
        Time Left: {formatTime(timer)}
      </div>
    </div>
  );
};

export default Navbar;
