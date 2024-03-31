import "./SignUpPage.scss";

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
  const [errors, setErrors] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleInputChange = (e, field) => {

    const { value } = e.target;
    switch (field) {
      case 'fullName':
        setFullName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
  };

  const handleInputBlur = (field) => {
    if (!field) return;
    if (!errors[field]) return;
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error message state
    setErrorMessage('');

    // Validate form fields //
    const newErrors = {};
    if (!fullName) {
      newErrors['fullName'] = 'Full name is required';
    }
    if (!username) {
      newErrors['username'] = 'Username is required';
    }
    if (!email) {
      newErrors['email'] = 'Email is required';
    }
    if (!password) {
      newErrors['password'] = 'Password is required';
    }
    if (!confirmPassword) {
      newErrors['confirmPassword'] = 'Confirm Password is required';
    }
    if (!agreeTerms) {
      newErrors['agreeTerms'] = 'You must agree to the Terms and Conditions';
    }
    if (!isValidEmail) {
      newErrors['email'] = 'Invalid email format';
    }
    if (password !== confirmPassword) {
      newErrors['confirmPassword'] = 'Passwords do not match';
    }

    // Update errors state //
    setErrors(newErrors);

    // If no errors, proceed with form submission //
    if (Object.keys(newErrors).length === 0) {
      const userData = {
        fullName,
        username,
        email,
        password,
      };

      try {
        const response = await axios.post('http://localhost:8080/api/users/register', userData);
        setShowModal(true);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error('Signup error:', error);
          setErrorMessage('An error occurred during signup. Please try again later.');
        }
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
        <Input
          name="fullName"
          value={fullName}
          label="Full Name"
          onChange={(e) => handleInputChange(e, 'fullName')}
          onBlur={() => handleInputBlur('fullName')}
          type="text"
          className={errors.fullName ? 'error' : ''}
        />
        {errors.fullName && <span className="form__error">{errors.fullName}</span>}

        <Input
          name="username"
          value={username}
          label="Create Username"
          onChange={(e) => handleInputChange(e, 'username')}
          onBlur={() => handleInputBlur('username')}
          type="text"
          className={errors.username ? 'error' : ''}
        />
        {errors.username && <span className="form__error">{errors.username}</span>}

        <Input
          name="email"
          value={email}
          label="Email"
          onChange={(e) => handleInputChange(e, 'email')}
          onBlur={() => handleInputBlur('email')}
          type="email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="form__error">{errors.email}</span>}

        <Input
          name="password"
          value={password}
          label="Create Password"
          onChange={(e) => handleInputChange(e, 'password')}
          onBlur={() => handleInputBlur('password')}
          type="password"
          placeholder="Enter Your Password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="form__error">{errors.password}</span>}

        <Input
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => handleInputChange(e, 'confirmPassword')}
          onBlur={() => handleInputBlur('confirmPassword')}
          type="password"
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <span className="form__error">{errors.confirmPassword}</span>}

        {/* Agree to Terms and Conditions */}
        <div className="form__terms">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className='form__input'
            onBlur={() => handleInputBlur('agreeTerms')}
          />
          <span className="form__checkmark"></span>
          <label className="form__label" htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
          {errors.agreeTerms && <span className="form__error">{errors.agreeTerms}</span>}
        </div>

        {/* Sign Up Button */}
        <Button
          className="form__button"
          type="submit"
        >
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
      <p className="form__footer">
        Already have an account? Click here to
        <Link to="/login"> login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
