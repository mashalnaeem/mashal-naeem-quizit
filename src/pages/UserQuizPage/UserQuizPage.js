import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function UserQuizPage() {
  const { userId } = useParams();
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}`);
        setUserQuizzes(response.data);
        if (response.data.length === 0) {
          setShowModal(true);
        }
      } catch (error) {
        setError('Error fetching user quizzes. Please try again.');
      }
    };

    fetchUserQuizzes();
  }, [userId]);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h2>User Quizzes</h2>
      {error && <p className="error-message">{error}</p>}
      {userQuizzes.map(quiz => (
        <div key={quiz.id} className="quiz-card">
          <h3>{quiz.title}</h3>
          <p>Category: {quiz.category}</p>
          <p>Total Questions: {quiz.num_questions}</p>
          <Button variant="primary">Details</Button>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sorry, no quizzes found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>There are no created quizzes.</p>
          <p>Would you like to create one?</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/${userId}/create`} className="btn btn-primary">Create Quiz</Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserQuizPage;

