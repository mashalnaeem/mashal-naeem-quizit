import "./Header.scss";

import { NavLink, useNavigate, Link } from 'react-router-dom';

import logo from "../../assets/logo/logo.svg";
import darkIcon from "../../assets/images/dark.svg"
import lightIcon from "../../assets/images/light.svg"

function Header({ toggleDarkMode, darkMode }) {

  const navigate = useNavigate();

  // Check if the JWT token is present in session storage
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const userId = sessionStorage.getItem('userId');

  const handleLogout = async () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/">
        <img className="header__image" src={logo} alt="Quiz-It-logo" />
      </Link>

      {/* Navigation links */}
      <nav className="nav">
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
                <Link to="/login" className="nav__link" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

    <div>
    <img src={darkMode ? lightIcon : darkIcon} alt={darkMode ? "sun" : "crescent"} onClick={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
