import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authservice from './service/authservice';
import './login.css';
import Header from './Header';

const Login1 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sessionTimeoutDuration = 5 * 60 * 1000; // 5 minutes (in milliseconds)
  let sessionTimer;

  const resetSessionTimer = () => {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(handleLogout, sessionTimeoutDuration);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('Session timed out. User logged out.');
  };

  useEffect(() => {
    // Start the session timeout timer when the component mounts
    sessionTimer = setTimeout(handleLogout, sessionTimeoutDuration);

    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(sessionTimer);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    resetSessionTimer(); // Reset the session timer when the user logs in
  };

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authservice
      .login(username, password)
      .then((response) => {
        if (response.data && response.data.responseText === 'Success') {
          console.log('Login success:', response.data);
          alert('Successfully logged in!');
          handleLogin(); // Call handleLogin to reset the session timer
          navigate('/main');
        } else {
          console.log('Login failed:', response.data);
          alert('Login failed. Please check your credentials.');
        }
      });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Header />
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="username"
                value={username}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Welcome to your account!</h1>
          {/* Display your logged-in content here */}
        </div>
      )}
    </div>
  );
};

export default Login1;
