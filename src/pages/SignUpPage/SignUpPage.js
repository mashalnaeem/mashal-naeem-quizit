import "./SignUpPage.scss";

import { useState } from 'react';
import axios from 'axios';
import Input from "../../components/Input/Input.js"
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

import ModalComponent from "../../components/ModalComponent/ModalComponent";

function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

    if (!field || !errors[field]) return;
  
    // Clear errors for input fields and the "Agree to Terms" checkbox
    if (field === 'agreeTerms' || errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    }
  };  

  const handleSignup = async (e) => {

    e.preventDefault();

    // Validate form fields //
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors['fullName'] = 'Full name is required';
    }
    if (!username.trim()) {
      newErrors['username'] = 'Username is required';
    }
    if (!email.trim()) {
      newErrors['email'] = 'Email is required';
    }
    if (!password.trim()) {
      newErrors['password'] = 'Password is required';
    }
    if (!confirmPassword.trim()) {
      newErrors['confirmPassword'] = 'Confirm Password is required';
    }
    if (!isValidEmail) {
      newErrors['email'] = 'Invalid email format';
    }
    if (password !== confirmPassword) {
      newErrors['confirmPassword'] = 'Passwords do not match';
    }
    if (!agreeTerms) {
      newErrors['agreeTerms'] = 'You must agree to the Terms and Conditions';
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
        console.error('Signup error:', error);
        setErrorMessage('An error occurred during signup');
      }
    }
  };

  const handleClick = () => {
    
    setShowModal(false);
    navigate("/login");
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
        <ModalComponent 
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Signup Successful"
          body="Your account has been successfully created!"
          closeButton="Go to Login"
          onClick={handleClick} 
        />
      </form>
      <p className="form__footer">
        Already have an account? Click here to
        <Link to="/login"> login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
