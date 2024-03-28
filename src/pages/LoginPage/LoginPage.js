import "./LoginPage.scss"

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
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

      // Store the token in session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);

      // Redirect user to profile page
      navigate(`/${response.data.userId}/home`);

    } catch (error) {
      setError(error.response.data.error);
    }
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
        <Button className="form__button" type="submit">Login</Button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;

