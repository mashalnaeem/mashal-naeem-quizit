import "./ProfilePage.scss";

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import BackIcon from '../../components/BackIcon/BackIcon';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

import editIcon from '../../assets/icons/edit-24px.svg';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg'

function ProfilePage() {

  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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
  };

  const handleDeleteProfile = async () => {

    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
  
      // Clear sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
  
      // Show modal
      setShowModal(true);
  
    } catch (error) {
      console.error('Error deleting user:', error);
  
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        
        // Display custom error message to the user
        setError(errorMessage);

      } else {
        setError('An error occurred while deleting the user.');
      }
    }
  };
  
  const handleCloseModal = () => {

    setShowModal(false);
    navigate('/login');
  };

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'column'
    },

    title: {
      text: 'User Score vs Quizzes Played',
      style: {
        fontFamily: "Lordina",
        fontWeight: 500,
        color: "black",
      },
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
    <section className="profile">
      <div className="profile__container">
        <article className="profile__icons-container">

          <BackIcon className="profile__back" />
          <img
            className="profile__icon"
            src={editIcon} alt="edit-profile"
            onClick={handleEditProfile}
          />
          <img
            className="profile__icon"
            src={deleteIcon}
            alt="delete-profile"
            onClick={handleDeleteProfile}
          />
        </article>
        <h2 className="profile__title">User Profile</h2>

        {error && <p className="profile__error">{error}</p>}
        
        {user && (
          <div className="profile__text">
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

            <article className="profile__button-container">
              <Button className="profile__button" onClick={handleLogout}>Logout</Button>
              <Link to={`/${userId}/user_quizzes`}>
                <Button className="profile__button">My Quizzes</Button>
              </Link>
              <Link to={`/${userId}/quizzes`}>
                <Button className="profile__button">Explore Quizzes</Button>
              </Link>
              <Link to={`/${userId}/create`}>
                <Button className="profile__button">Create Quiz</Button>
              </Link>
            </article>

            {/* Highcharts chart */}
            <HighchartsReact highcharts={Highcharts} options={options} />

            {/* Modal */}
            <ModalComponent
              show={showModal}
              onHide={handleCloseModal}
              title="User Deleted"
              body="The user has been successfully deleted."
              primaryButton="Go To Login"
              onClick={handleCloseModal}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
