import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

const UserQuizDetails = ({ userId, quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}/${quizId}`);
        setQuiz(response.data);
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
    <div>
      {/* Edit Icon */}
      <Link to={`/${userId}/user_quizzes/edit/${quizId}`}>
        <img src={editIcon} alt="edit-icon" />
      </Link>
      {/* Delete Icon */}
      <button onClick={handleDeleteQuiz}>
        <img src={deleteIcon} alt="delete-icon" />
      </button>
      <h2>Quiz Details</h2>
      <p>Title: {quiz.title}</p>
      <p>Description: {quiz.description}</p>
      <p>Category: {quiz.category}</p>
      <p>Time (Mintues): {quiz.duration_minutes}</p>
      <p>Settings: {quiz.is_public ? "Public" : "Private"}</p>
      <Link to={`/${userId}/user_quizzes/${quizId}/broadcast_play`}><Button variant="primary">Broadcast Play</Button></Link>
      
      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Quiz Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The quiz has been successfully deleted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Go Back to My Quizzes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserQuizDetails;
