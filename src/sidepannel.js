import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MainHeader from "./MainHeader";
import { useNavigate } from "react-router-dom";
//import MetisMenu from "@metismenu/react";
import "./sidebar.css"

import { Link, useLocation } from "react-router-dom";

const Sidepannel = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const local = useLocation()
  const navigate = useNavigate();

  const userdata = () => {
    navigate('/UserDetailsComponent');
  };

  const wdgwheellist = () => {
    navigate('/WdgwheelList');
  };

  const splist = () => {
    navigate('/page');
  };

  const lineChart = () => {
    navigate('/linechart');
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className={local.pathname === "/UserDetailsComponent" ? "active" : ""}>
              <Link to="/UserDetailsComponent" ><HomeOutlinedIcon /> <span>  User Details</span></Link>
            </li>
            <li className={local.pathname === "/WdgwheelList" ? "active" : ""}>
              <Link to="/WdgwheelList"><PeopleOutlinedIcon /> <span>  WdgwheelList</span></Link>
            </li>
            <li className={local.pathname === "/page" ? "active" : ""}>
              <Link to="/page"><ContactsOutlinedIcon /> <span>  SPID List</span></Link>
            </li>
            <li className={local.pathname === "/linechart" ? "active" : ""}>
              <Link to="/linechart" ><ReceiptOutlinedIcon /><span>  LineChart</span></Link>
            </li>
            <li className={local.pathname === "/ChatRoom" ? "active" : ""}>
              <Link to="/chatroom" ><ReceiptOutlinedIcon /><span>Chat</span></Link>
            </li>
            <li className={local.pathname === "/ChatRoom" ? "active" : ""}>
              <Link to="/camerarec" ><ReceiptOutlinedIcon /><span>Camera</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidepannel;