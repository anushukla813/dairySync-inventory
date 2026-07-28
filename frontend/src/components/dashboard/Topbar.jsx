import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/Topbar.css';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar-header">
      {/* Dark Styled Search Input Bar */}
      <div className="search-bar-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input" 
        />
      </div>

      {/* Topbar Right Actions & Interactive Dropdown */}
      <div className="topbar-right">
        <button className="icon-btn">⚙️</button>
        
        <div className="notification-btn-wrapper">
          <button className="icon-btn">🔔</button>
          <span className="notif-badge">1</span>
        </div>

        {/* User Profile Container with Clickable Dropdown */}
        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
          <div 
            className="user-profile-btn" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="avatar-circle">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Vivek Pandey" 
                className="avatar-img" 
              />
            </div>
            <div className="user-details">
              <span className="user-name">Vivek Pandey 790</span>
              <span className="user-role">ADMIN</span>
            </div>
            <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>

          {/* Popup Menu matching target screenshot */}
          {isOpen && (
            <div className="profile-menu">
              <button 
                className="menu-option" 
                onClick={() => { navigate('/vendor/profile'); setIsOpen(false); }}
              >
                <span className="menu-opt-icon">👤</span> Profile
              </button>
              <button className="menu-option">
                <span className="menu-opt-icon">⚙️</span> Account Settings
              </button>
              <div className="menu-divider"></div>
              <button 
                className="menu-option logout-opt" 
                onClick={() => { navigate('/login'); setIsOpen(false); }}
              >
                <span className="menu-opt-icon">🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;