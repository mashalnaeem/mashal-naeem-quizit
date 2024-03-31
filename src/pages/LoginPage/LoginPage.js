import "./LoginPage.scss";

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

import Input from "../../components/Input/Input.js";

function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e, field) => {

    const { value } = e.target;
    setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  // Validate form fields
  const newErrors = {};
  if (!email) {
    newErrors['email'] = 'Email is required';
  }
  if (!password) {
    newErrors['password'] = 'Password is required';
  }
  
  // Update errors state
  setErrors(newErrors);

  // If any required field is missing, stop login process
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Attempt login
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', {
      email,
      password,
    });
    const { userId, token } = response.data;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
    navigate(`/${response.data.userId}/home`);

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);

    } else {
      setError('An error occurred during login.');
    }
  }
};

  return (
    <div className="form">
      <h2 className="form__title">User Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={email}
          label="Email"
          onChange={(e) => handleInputChange(e, 'email')}
          type="email"
          placeholder="Enter Your Email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="form__error">{errors.email}</span>}

        <Input
          name="password"
          value={password}
          label="Password"
          onChange={(e) => handleInputChange(e, 'password')}
          type="password"
          placeholder="Enter Your Password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="form__error">{errors.password}</span>}
        {error && <div className="form__error">{error}</div>}

        <Button className="form__button" type="submit">Login</Button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
