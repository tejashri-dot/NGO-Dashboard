import React, { useState, useContext } from 'react';
import { FaSearch, FaEnvelope, FaBell, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Styles from './Navbar.module.css';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const { mode, changeMode } = useContext(ThemeContext); // Get mode and changeMode from context
  const [showMailPopup, setShowMailPopup] = useState(false); // State to toggle mail popup
  const [showNotificationPopup, setShowNotificationPopup] = useState(false); // State to toggle notification popup
  const [showProfilePopup, setShowProfilePopup] = useState(false); // State to toggle profile popup

  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'; // Toggle mode
    changeMode(newMode); // Call changeMode to update the mode
  };

  // Toggle functions for each popup
  const toggleMailPopup = () => setShowMailPopup(!showMailPopup);
  const toggleNotificationPopup = () => setShowNotificationPopup(!showNotificationPopup);
  const toggleProfilePopup = () => setShowProfilePopup(!showProfilePopup);

  const closeProfilePopup = () => setShowProfilePopup(false); // Close the profile popup

  return (
    <div className={Styles.Container}>
      <div className={Styles.Welcome}>Welcome Admin</div>

      <div className={Styles.SearchBar}>
        <input type="text" placeholder="Search..." />
        <FaSearch className={Styles.SearchIcon} />
      </div>

      <div className={Styles.Actions}>
        <FaEnvelope
          className={Styles.Icon}
          title="Mails"
          onClick={toggleMailPopup} // Toggle mail popup
        />
        {showMailPopup && (
          <div className={`${Styles.Popup} ${mode === 'dark' ? Styles.PopupDark : Styles.PopupLight}`}> 
            {/* Mail popup with dynamic styling */}
            <p>No new mails</p>
          </div>
        )}

        <FaBell
          className={Styles.Icon}
          title="Notifications"
          onClick={toggleNotificationPopup} // Toggle notification popup
        />
        {showNotificationPopup && (
          <div className={`${Styles.Popup} ${mode === 'dark' ? Styles.PopupDark : Styles.PopupLight}`}> 
            {/* Notification popup with dynamic styling */}
            <p>No new notifications</p>
          </div>
        )}

        {mode === 'dark' ? (
          <FaSun className={Styles.Icon} title="Light Mode" onClick={toggleDarkMode} />
        ) : (
          <FaMoon className={Styles.Icon} title="Dark Mode" onClick={toggleDarkMode} />
        )}

        <FaUserCircle
          className={Styles.Icon}
          title="Profile"
          onClick={toggleProfilePopup} // Toggle profile popup
        />
        {showProfilePopup && (
          <div className={`${Styles.Popup}`}> 
            <Link to="/view-profile" onClick={closeProfilePopup}><p>View Profile</p></Link>
            <Link to="/edit-profile" onClick={closeProfilePopup}><p>Edit Profile</p></Link>
            <Link to="/change-password" onClick={closeProfilePopup}><p>Change Password</p></Link>
            <Link to="/settings" onClick={closeProfilePopup}><p>Settings</p></Link>
            <Link to="/logout" onClick={closeProfilePopup}><p>Logout</p></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
