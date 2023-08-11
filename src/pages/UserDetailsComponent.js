import React, { useState, useEffect } from 'react';
import UserDetailsService from '../service/UserDetailsService';
import { useNavigate } from "react-router-dom";
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';
import { Link } from 'react-router-dom'
import authservice from '../service/authservice';

const UserDetailsComponent = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsersList();

    }, [])

    const getAllUsersList = () => {
        UserDetailsService.getAllUsersList()
            .then((response) => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteUser = (id) => {
        // console.log(id)
        authservice.deleteUser(id)
            .then((response) => {
                console.log(response) 
                 alert("Deleted Successfully!")
                     window.location.reload();
              
            }).catch(error => {
                console.log(error);
            })
    }

    const next = (id) => {
        console.log(id)
        var data = id;
        navigate("/adduser", { state: data });
    }

    return (
        <div>
            <MainHeader />
            <Sidepannel />
            <div className="page-wrapper">
                <h2 className="text-center">Users List</h2>
                <div style={{ float: "left", width: "100%" }}>
                    <Link to="/adduser" className="adduserBtn">Add User</Link>
                </div>
                {/* <div className='table-responsive'> */}
                <table style={{ width: '100%', border: '1px solid black', margin: '2%' }}>
                    <thead style={{  border: '1px solid black' ,textAlign:"center"}}>
                        <th style={{  border: '1px solid black'}}> ID</th>
                        <th style={{  border: '1px solid black'}}>USERNAME</th>
                        <th style={{  border: '1px solid black'}}>PASSWORD</th>
                        <th style={{  border: '1px solid black'}}>EMAIL</th>
                        <th style={{  border: '1px solid black'}}>ROLE</th>
                        <th style={{  border: '1px solid black'}}>ACTIONS</th>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key={user}>
                                        <td style={{  border: '1px solid black'}}>{user.id}</td>
                                        <td style={{  border: '1px solid black'}}>{user.username}</td>
                                        <td style={{  border: '1px solid black'}}>{user.password}</td>
                                        <td style={{  border: '1px solid black'}}>{user.email}</td>
                                        <td style={{  border: '1px solid black'}}>{user.role}</td>
                                        <td style={{  border: '1px solid black'}}>
                                            <button className="btn btn-info" onClick={() => next(user.id)} >Edit</button>
                                            <button className="btn btn-danger" style={{ marginLeft: "10px" }}
                                                onClick={() => deleteUser(user.id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* </div> */}
            </div>

        </div>

    )
}
export default UserDetailsComponent;

