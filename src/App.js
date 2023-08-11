import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import HomePage from './HomePage';
import './App.css';
import UserDetailsComponent from './pages/UserDetailsComponent';
import WdgwheelList from './pages/WdgwheelList';
import Sidepannel from './sidepannel';
import AddUserComponent from './pages/AddUserComponent';
import CameraComponent from './pages/CameraComponent';
import PaginationSearch from './pages/PaginationSearch';
import LineChart from './pages/LineChart';
import RegisterComponent from './pages/RegisterComponent';
import Login1 from './Login1';
import MyProfile from './pages/MyProfile';
import Header from './Header';
import MainHeader from './MainHeader';
//import './style.css';
import './bootstrap.css'
import './bootstrap.min.css';
import SessionTimeout from './service/SessionTimeOut';
import ChangePassword from './pages/ChangePassword';
import ChangePaswd from './pages/ChangePaswd';
import ChngPass from './pages/ChngPass';
import ChatRoom from './chatRoom';


const App = () => {

  const sessionTimeoutMinutes = 30;
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<HomePage />} />
          <Route path="/userdetailscomponent" element={<UserDetailsComponent />} />
          <Route path="/wdgwheellist" element={<WdgwheelList />} />
          <Route path="/adduser" element={<AddUserComponent />} />
          <Route path="/edituser/:id" element={<AddUserComponent />} />
          <Route path="/camera" element={<CameraComponent />} />
          <Route path="/page" element={<PaginationSearch />} />
          <Route path="/linechart" element={<LineChart />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/myprofile" element={<MyProfile />} />
         {/*  <Route path="/changepwd" element={<ChangePaswd />} />*/}
          <Route path="/chngpass" element={<ChngPass />} />
          <Route path="/chatroom" element={<ChatRoom/>} />
          {/* <Route path="/chatroom" element={<ChatRoom/>} /> */}

        </Routes>
        <SessionTimeout timeoutMinutes={sessionTimeoutMinutes} />
    </BrowserRouter>
  );
};

export default App;
