import { useState } from 'react';
import axios from 'axios';
// import Input from "../../components/Input"

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
    <div className="signup-page">
      <h1>Create Your Quiz-It Account</h1>
      <form onSubmit={handleSignup}>
        {/* Form fields */}
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input'
            required
          />
        </div>
        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input'
            required
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            required
          />
        </div>
        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='input'
            required
          />
        </div>
        {/* Agree to Terms and Conditions */}
        <div className="form-group">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className='input'
            required
          />
          <label htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
        </div>
        {/* Error message display */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/* Password mismatch error message */}
        {password !== confirmPassword && <p className="error-message">Passwords don't match</p>}
        {/* Sign Up Button */}
        <button type="submit" disabled={!agreeTerms || password !== confirmPassword}>Sign Up</button>      
      </form>
    </div>
  );
}

export default SignupPage;
