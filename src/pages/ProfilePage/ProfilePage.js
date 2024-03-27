import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        // Get the user ID from sessionStorage or wherever it's stored
        const userId = sessionStorage.getItem('userId');
    
        // Get the token from sessionStorage
        const token = sessionStorage.getItem('token');
    
        // Make the GET request with the user ID as a parameter and the token in the headers
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });    
        setUser(response.data);

      } catch (error) {
        // Handle error fetching user data
        setError('Error fetching user data. Please try again.');
      }
    };
  
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Send logout request to the server
      await axios.post('/api/user/logout');
      // Clear user data and redirect to login page
      setUser(null);
      setError('');
      // Redirect to login page
      window.location.href = '/login'; // Redirect to login page

    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error
      setError('Error logging out. Please try again.');
    }
  };

  const handleMyQuizzes = () => {
    navigate('/quizzes'); // Redirect to My Quizzes page
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user information as needed */}
          <Button variant="primary" onClick={handleMyQuizzes}>My Quizzes</Button>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
