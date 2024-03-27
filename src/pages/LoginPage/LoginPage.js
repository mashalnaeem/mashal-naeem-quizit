import "./LoginPage.scss"

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Input/Input.js"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      const { userId, token } = response.data;

      // Store user ID and token in session storage
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('token', token);

      // Redirect user to profile page
      navigate('/profile');

    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="form">
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
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
          label="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
        />
        <button className="form__button" type="submit">Login</button>
        <button className="form__button form__button--cancel" type="button" onClick={handleGoBack}>Go Back</button> {/* Add a button to go back */}
      </form>
    </div>
  );
}

export default LoginPage;

