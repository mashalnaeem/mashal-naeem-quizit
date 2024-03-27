import "./Header.scss"

import logo from "../../assets/logo/quiz-it.svg"

import { Link } from 'react-router-dom'; 

function Header() { 
    return (
        <header>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
            <img src={logo} alt="Quiz-It-logo"/>
        </Link>
      </div>

      {/* Navigation links */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </ul>
      </nav>
    </header>
    )
};

export default Header;