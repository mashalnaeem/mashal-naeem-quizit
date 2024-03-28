import React from 'react';
import "./Header.scss";
import logo from "../../assets/logo/logo.svg";
import { Link } from 'react-router-dom';

function Header() {
  // Check if the JWT token is present in session storage
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const userId = sessionStorage.getItem('userId')

  return (
    <header className="header">
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
          {!isLoggedIn && <li className="nav__item"><Link className="nav__link" to="/signup">Sign Up</Link></li>}
          {!isLoggedIn && <li className="nav__item"><Link className="nav__link" to="/login">Log In</Link></li>}
          {isLoggedIn && <li className="nav__item"><Link className="nav__link" to={`/${userId}/profile`}>Profile</Link></li>}
          {isLoggedIn && <li className="nav__item"><Link className="nav__link" to="/logout">Logout</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
