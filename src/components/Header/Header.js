import "./Header.scss";

import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import logo from "../../assets/logo/logo.svg";
import lightIcon from "../../assets/images/light.svg";
import darkIcon from "../../assets/images/dark.svg";

function Header() {

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode(prevMode => !prevMode);

    // Apply styles based on dark mode state
    if (!isDarkMode) {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFFFF';

    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '#000000'
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
          <li className="nav__item">
            <NavLink to={"/" || `/${userId}/home`} className="nav__link" activeClassName="active">Home</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li className="nav__item">
                <NavLink to="/signup" className="nav__link" activeClassName="active">Sign Up</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/login" className="nav__link" activeClassName="active">Log In</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav__item">
                <NavLink to={`/${userId}/profile`} className="nav__link" activeClassName="active">Profile</NavLink>
              </li>
              <li className="nav__item">
                <Link className="nav__link" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
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
