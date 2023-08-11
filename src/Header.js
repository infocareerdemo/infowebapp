import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    const [activeLink, setActiveLink] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);


    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="header">
            <div style={{display:"flex",justifyContent:"space-between",margin:"15px",width:"25%",float:"right"}}>
                <div className={`header__nav-item ${activeLink === 'home' ? 'active' : ''}`}>
                    <Link to="/" onClick={() => handleLinkClick('home')}>Home</Link>
                </div>
                <div className={`header__nav-item ${activeLink === 'about' ? 'active' : ''}`}>
                    <Link to="/about" onClick={() => handleLinkClick('about')}>About</Link>
                </div>
                <div className={`header__nav-item ${activeLink === 'login' ? 'active' : ''}`}>
                    <Link to="/login" onClick={() => handleLinkClick('login')}>Login</Link>
                </div>
                {/* <div className={`header__nav-item ${activeLink === 'login' ? 'active' : ''}`}>
                    <Link to="/camera" onClick={() => handleLinkClick('camera')}>Image</Link>
                </div> */}
                <div className={`header__nav-item ${activeLink === 'login' ? 'active' : ''}`}>
                    <Link to="/register" onClick={() => handleLinkClick('register')}>Register</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
