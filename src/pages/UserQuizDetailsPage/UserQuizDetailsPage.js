import "./UserQuizDetailsPage.scss"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

import BackIcon from '../../components/BackIcon/BackIcon';
import ModalComponent from "../../components/ModalComponent/ModalComponent";

function UserQuizDetailsPage() {

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { userId, quizId } = useParams();

  useEffect(() => {

    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}/${quizId}`);
        setQuiz(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Error fetching quiz details. Please try again.');
      }
    };

    fetchQuizDetails();
  }, [userId, quizId]);

  const handleDeleteQuiz = async () => {
    try {
      // Send DELETE request to delete the quiz
      await axios.delete(`http://localhost:8080/api/user_quizzes/${userId}/${quizId}`);
      setShowModal(true); // Show modal after successful deletion
      console.log('Quiz deleted successfully!');

    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleCloseModal = () => {

    setShowModal(false);
    window.location.reload();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <section className="details">
      <div className="details__container">
        <BackIcon className="profile__back" />
        <h2 className="details__title">Quiz Information</h2>
        <article className="details__box">
          <p className="details__text"><strong>Description:</strong> {quiz.description}</p>
          <p className="details__text"><strong>Duration:</strong> {quiz.duration_minutes} minutes</p>
          <p className="details__text"><strong>Difficulty:</strong> {quiz.difficulty}</p>
          <p className="details__text"><strong>Category:</strong> {quiz.category}</p>
          <p className="details__text"><strong>Questions:</strong> {quiz.num_questions}</p>
          <p className="details__text"><strong>Settings:</strong> {quiz.is_public ? "Public" : "Private"}</p>
        </article>
        <div className="details__icon-box">
          <Link to={`/${userId}/user_quizzes/edit/${quizId}`}>
            <img className="details__icon" src={editIcon} alt="edit-icon" />
          </Link>
          <img className="details__icon" src={deleteIcon} alt="delete-icon" onClick={handleDeleteQuiz} />
        </div>
        <Button className="details__buttons">Broadcast Play</Button>

        {/* Modal for success message */}
        <ModalComponent 
          show={showModal} 
          onHide={handleCloseModal}
          title="Quiz Deleted"
          body="The quiz has been successfully deleted."
          primaryButton="Go Back to My Quizzes"
          onClick={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default UserQuizDetailsPage;
