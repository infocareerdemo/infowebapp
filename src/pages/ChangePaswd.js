import React, { useState, } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import MainHeader from '../MainHeader';
import authservice from '../service/authservice';
import Sidepannel from '../sidepannel';

const ChangePaswd = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usertoken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
authservice.
      ChangePassword(usertoken, oldPassword, newPassword)
      .then((response) => {
        if (response.data.status === 200) {
            alert("Password")
          navigate('/main');
        } else {
          alert(response.data.Message);
        }
      });
  };

  return (
    <div>
        <MainHeader /> 
        <Sidepannel></Sidepannel>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="ChangePass-Container">
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* <div className="form-group">
              <label>Confrim Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div> */}

            <button type="submit">Confrim</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePaswd;
