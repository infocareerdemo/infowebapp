import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation ,useNavigate } from 'react-router-dom';
import authservice from '../service/authservice';
import MainHeader from '../MainHeader';
import Sidepannel from '../sidepannel';


const AddUserComponent = () => {
    const navigate = useNavigate();
    const [username, setUserame] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [id, setId] = useState('')

    const location = useLocation();
    const data = location.state;

    const saveOrUpdateUser = (e) => {
        e.preventDefault();

        //const user = {username, password, email,role}

        /*if(id){
            authservice.updateUser(id,username, password, email,role)
            .then((response) => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

        }else{*/
        authservice.createUser(username, password, email, role)
            .then((response) => {
                console.log(response.data)
                alert("User Added Successfully");
                navigate('/userdetailscomponent')
                //history.push('/userdetailscomponent');
                //history.push('/userdetailscomponent');

            }).catch(error => {
                console.log(error)
                alert("User Not Added");
            })

    }
    const title = () => {

        if (data != null) {
            return <h2 className="text-center">Update User</h2>
        } else {
            return <h2 className="text-center">Add User</h2>
        }
    }

    return (
        <div>
            <MainHeader />
            <Sidepannel />
            <div className="page-wrapper">
                <div>
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                {data !=null ? 
                                <div className="form-group mb-2">
                                    <label className="form-label">Id :</label>
                                    <input
                                        placeholder="Enter Id"
                                        name="Id"
                                        className="form-control"
                                        value={data}
                                        disabled
                                        onChange={(e) => setId(e.target.value)}
                                    >
                                    </input>
                                </div> :<></>}
                                <div className="form-group mb-2">
                                    <label className="form-label"> Username :</label>
                                    <input
                                        type="username"
                                        placeholder="Enter Username"
                                        name="Username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUserame(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                       name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Email :</label>
                                    <input
                                       type="email"
                                        placeholder="Enter Email "
                                       name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Role :</label>
                                    <input
                                        type="role"
                                        placeholder="Enter Role"
                                        name="role"
                                        className="form-control"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="subandcanBtn">
                                <button className="btn btn-primary" onClick={(e) => saveOrUpdateUser(e)}>Submit</button>
                                &nbsp; &nbsp;
                                <Link to="/userdetailscomponent" className="btn btn-primary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddUserComponent;
