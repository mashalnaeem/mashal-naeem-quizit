import "./Header.scss"

import logo from "../../assets/logo/quiz-it.svg"

import { Link } from 'react-router-dom'; 

function Header() { 
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
          <li className="nav__item"><Link className="nav__link" to="/signup">Sign Up</Link></li>
          <li className="nav__item"><Link className="nav__link" to="/login">Log In</Link></li>
        </ul>
      </nav>
    </header>
    )
};

export default Header;