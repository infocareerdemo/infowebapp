import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import authservice from '../service/authservice';
import CameraComponent from './CameraComponent';
import Header from '../Header';

const RegisterComponent = () => {
    //const history = useHistory();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [country, setCountry] = useState('')
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[0-9]{10}$/;

    const countryOptions = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'India',
        'Germany'
    ];

    const nextPageBtn = () => {
        const attributes = {
            firstname,
            lastname,
            email,
            phone,
            gender,
            dob,
            country,
        };

        if (firstname === "") {
            alert("Please Enter the Firstname")
        }
        else if (lastname === "") {
            alert("Please Enter the Lastname")
        }
        else if (dob === "") {
            alert("Please Enter the Date of Birth")
        }
        else if (gender === "") {
            alert("Please Select the Gender")
        }
        else if (country == "") {
            alert("Please Select the Country")
        }
        else if (phone === "") {
            alert("Please Enter the Phone No")
        }
        else if(phonePattern.test(phone) === false){
            alert("Please enter a valid 10-digit mobile number")
        }
        else if (email === "") {
            alert("Please Enter the Email Id")
        }
        else if (emailPattern.test(email) === false) {
            alert("Please enter a valid email address")
        }
        else {
            navigate('/camera', {
                state: { attributes },
            });
            console.log(attributes, "kmk")
        }
    };

    return (
        <div>
            <Header />

            <div className="login-container">
                <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                    <h2>Register</h2>
                </div>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    placeholder='First Name'
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>DOB:</label>
                                <input
                                    type="date"
                                    placeholder='Dob'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Gender:</label>
                                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ margin: "4px" }}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ margin: "4px" }}
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Other"
                                            checked={gender === 'Other'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ margin: "4px" }}
                                        />
                                        Others
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Country:</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Select Country</option>
                                    {countryOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    min={0}
                                    placeholder='Phone Number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6" />
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button type='button' onClick={nextPageBtn} className='btn btn-primary'>Next</button>
                    </div>
                    {/*<button className = "btn btn-success" onClick = {(e) => saveRegisterUser(e)}>Submit</button>*/}
                    {/* <div className="subBtn">
            <Link to="/camera" className="btn btn-danger">Next</Link>
            </div>  */}
                </form>
            </div>

        </div>
    );
};
export default RegisterComponent;