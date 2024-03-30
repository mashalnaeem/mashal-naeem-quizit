import { useState } from 'react';
import "./Header.scss";
import logo from "../../assets/logo/logo.svg";
import { Link } from 'react-router-dom';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode(prevMode => !prevMode);
    
    // Apply styles based on dark mode state
    if (!isDarkMode) {
        // If dark mode is enabled, set background color to black and text color to white
        document.body.style.backgroundColor = '#000000'; // Black background color
        document.body.style.color = '#ffffff'; // White text color
    } else {
        // If dark mode is disabled, revert back to default styles
        document.body.style.backgroundColor = ''; // Revert to default background color
        document.body.style.color = ''; // Revert to default text color
    }
};

  // Check if the JWT token is present in session storage
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const userId = sessionStorage.getItem('userId');

  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Logo */}
      <div className="header__logo">
        <Link to="/">
          <img className="header__image" src={logo} alt="Quiz-It-logo"/>
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="nav">
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
            <Link className="nav__link" to="/logout">Logout</Link>
          </li>}
          <li className="nav__item">
            <button className="nav__link" onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
