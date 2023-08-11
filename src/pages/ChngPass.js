import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../service/APICall';
import MainHeader from '../MainHeader';
import Sidepannel from '../sidepannel';

const ChngPass = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usertoken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    const headers = {
        Authorization: `Bearer ${usertoken}`
    };
    const apiUrl = "user/chngPswd";
    
    const submit = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and old password does not match");
        } else {
            try {
                const response = await postApi('POST', apiUrl, data, headers);
                console.log(response, "Password changed successfully");
                alert("Password changed successfully");
                navigate('/main');
            } catch (error) {
                console.error('Error changing password:', error.message);
            }
        }
    };

    return (
        <div>
            <MainHeader></MainHeader>
            <Sidepannel></Sidepannel>
            <div>
                <div style={{ width: "100%", height: "100%" }}>
                    <div className="ChangePass-Container">
                        <h2>Change Password</h2>
                        <form>
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

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="button" onClick={submit}>Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChngPass;
