import "./SignUpPage.scss"

import { useState } from 'react';
import axios from 'axios';
import Input from "../../components/Input/Input.js"
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Prepare user data object
    const userData = {
      fullName,
      username,
      email,
      password,
    };

    try {
      // Send POST request to backend signup endpoint
      const response = await axios.post('http://localhost:8080/api/users/register', userData);

      setShowModal(true);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);

      } else {
        console.error('Signup error:', error);
      }
    }
  };

  const handleClick = () => {
    setShowModal(false);
  }

  return (
    <div className="form">
      <h1 className="form__title">Create Your Quiz-It Account</h1>
      <form className="form__body" onSubmit={handleSignup}>

        {/* Form fields */}
        <Input
          name="fullName"
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          type="text"
        />
        <Input
          name="username"
          value={username}
          label="Create Username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <Input
          name="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          name="password"
          value={password}
          label="Create Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Your Password"
        />
        <Input
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />

        {/* Agree to Terms and Conditions */}
        <div className="form__terms">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className='form__input'
            required
          />
          <span className="form__checkmark"></span>
          <label className="form__label" htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
        </div>

        {/* Error message display */}
        {errorMessage && <p className="form__error">{errorMessage}</p>}

        {/* Password mismatch error message */}
        {password !== confirmPassword && <p className="form__error">Passwords don't match</p>}

        {/* Sign Up Button */}
        <Button
          className="form__button"
          type="submit"
          disabled={!agreeTerms || password !== confirmPassword}>
          Sign Up
        </Button>

        {/* Modal for successful signup */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Signup Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your account has been successfully created!</p>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/login">
              <Button variant="primary" onClick={handleClick}>
                Go to Login
              </Button>
            </Link>
          </Modal.Footer>

        </Modal>
      </form>
      <p>
        Already have an account? Click here to
        <Link to="/login"> login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
