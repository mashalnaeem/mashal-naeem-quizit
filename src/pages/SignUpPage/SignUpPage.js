import "./SignUpPage.scss"

import { useState } from 'react';
import axios from 'axios';
import Input from "../../components/Input/Input.js"
import { Link } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
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

      // Handle successful signup
      console.log('Signup successful:', response.data);

      // Extract the JWT token from the response
      const token = response.data.token;

      // Store the token in sessionStorage
      sessionStorage.setItem('token', token);

     } catch (error) {
        // Handle signup error
        if (error.response && error.response.data && error.response.data.message) {
          // If the backend sends an error message, set it as the error message state
          setErrorMessage(error.response.data.message);

        } else {
          // If no specific error message is sent from the backend, log the error
          console.error('Signup error:', error);
        }
      }
  };

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
        <button className="form__button" type="submit" disabled={!agreeTerms || password !== confirmPassword}>Sign Up</button>      
      </form>
      <p>
        Already a user? Click here to 
        <Link to="/login"> login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
