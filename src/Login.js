import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authservice from './service/authservice';
import './login.css';
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const sessionTimeoutDuration = 1 * 60 * 1000;
  let sessionTimer;

  const resetSessionTimer = () => {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(handleLogout, sessionTimeoutDuration);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
    console.log('Session timed out. User logged out.');
  };

  useEffect(() => {
    document.addEventListener('mousemove', resetSessionTimer);
    document.addEventListener('mousedown', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);
    document.addEventListener('touchmove', resetSessionTimer);

    return () => {
      document.removeEventListener('mousemove', resetSessionTimer);
      document.removeEventListener('mousedown', resetSessionTimer);
      document.removeEventListener('keypress', resetSessionTimer);
      document.removeEventListener('touchmove', resetSessionTimer);
      clearTimeout(sessionTimer);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
      .Login(username, password)
      .then((response) => {
        if (response.data && response.data.ResponseText === 'Success') {
          console.log('Login success:', response.data);
          localStorage.setItem("token",response.data.UserToken)
          setLoginFailed(false);
          navigate('/main');
        } else {
          console.log('Login failed:', response.data);
          setLoginFailed(true);
          alert(response.data.ResponseText);
        }
      })
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Header></Header>
        <div className='account-content' style={{marginTop:"10px"}}>
        <div className="login-container">
          <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
          <h2>Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
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
            <button type="submit" onClick={handleLogin}>Login</button>
            {loginFailed && (
              <div style={{ color: "red", marginTop: "10px" ,textAlign:"center" }}>
                Incorrect username or password. Please try again.
              </div>
            )}
          </form>
        </div>
        </div>
    </div>
  );
};
export default Login;
