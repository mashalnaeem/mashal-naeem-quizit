import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import editIcon from '../../assets/icons/edit-24px.svg';

function ProfilePage({ handleShow }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);

      } catch (error) {
        setError('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = async () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate(`/${userId}/profile/edit`);
    handleShow();
  };

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'User Score vs Quizzes Played'
    },
    xAxis: {
      categories: ['Quizzes Played']
    },
    yAxis: {
      title: {
        text: 'Current Score'
      }
    },
    series: [
      {
        name: 'Current Score',
        data: [user?.current_score || 0]
      },
      {
        name: 'Quizzes Played',
        data: [user?.quizzes_played]
      }
    ]
  };

  return (
    <div className="profile-container">
      <img src={editIcon} alt="Edit Profile" className="edit-icon" onClick={handleEditProfile} />
      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user && (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Display user's score and number of quizzes attempted */}
          <p>
            <strong>Current Score:</strong> {user.current_score}
          </p>
          <p>
            <strong>Total Score:</strong> {user.total_score}
          </p>
          <p>
            <strong>Quizzes Attempted:</strong> {user.quizzes_played}
          </p>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
          <Link to={`/${userId}/user_quizzes`}>
            <Button variant="primary">My Quizzes</Button>
          </Link>
          <Link to={`/${userId}/quizzes`}>
            <Button variant="primary">Explore Quizzes</Button>
          </Link>
          <Link to={`/${userId}/create`}>
            <Button variant="primary">Create Quiz</Button>
          </Link>
          {/* Highcharts chart */}
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
