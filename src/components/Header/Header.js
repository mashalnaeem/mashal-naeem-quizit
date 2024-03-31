import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from "../../assets/logo/logo.svg";
import lightIcon from "../../assets/images/light.svg";
import darkIcon from "../../assets/images/dark.svg";

import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode(prevMode => !prevMode);

    // Apply styles based on dark mode state
    if (!isDarkMode) {
      // If dark mode is enabled, set background color to black
      document.body.style.backgroundColor = '#000000'; 
      document.body.style.color = '#FFFFFF'; 
      // Black background color
    } else {
      // If dark mode is disabled, revert back to default styles
      document.body.style.backgroundColor = ''; 
      document.body.style.color = '#000000'// Revert to default background color
    }
  };

  // Check if the JWT token is present in session storage
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const userId = sessionStorage.getItem('userId');

  const handleLogout = async () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Logo */}
      <Link to="/">
        <img className="header__image" src={logo} alt="Quiz-It-logo" />
      </Link>

      {/* Navigation links */}
      <nav className={`nav ${isDarkMode ? 'dark-mode' : ''}`}>
        <ul className="nav__list">
          <li className="nav__item"><Link className="nav__link" to="/">Home</Link></li>
          {!isLoggedIn && <li className="nav__item">
            <Link className="nav__link" to="/signup">Sign Up</Link>
          </li>}
          {!isLoggedIn && <li className="nav__item">
            <Link className="nav__link" to="/login">Log In</Link>
          </li>}
          {isLoggedIn && <li className="nav__item">
            <Link className="nav__link" to={`/${userId}/profile`}>Profile</Link>
          </li>}
          {isLoggedIn && <li className="nav__item">
            <button className="nav__link" onClick={handleLogout}>Logout</button>
          </li>}
        </ul>
      </nav>

      {/* Dark mode toggle */}
      <div className="toggle-icons">
        {isDarkMode ? (
          <img src={lightIcon} alt="light-icon" className="nav__light" onClick={toggleDarkMode} />
        ) : (
          <img src={darkIcon} alt="dark-icon" className="nav__light" onClick={toggleDarkMode} />
        )}
      </div>
    </header>
  );
};

export default Header;
