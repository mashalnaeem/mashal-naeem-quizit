import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import "./UserQuizPage.scss"

import UserQuizDetails from '../../components/UserQuizDetails/UserQuizDetails';

function UserQuizPage() {
    const { userId } = useParams();
    const [userQuizzes, setUserQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for error modal

    useEffect(() => {
        const fetchUserQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}`);
                setUserQuizzes(response.data);
                if (response.data.length === 0) {
                    setShowModal(true); // Show modal if no quizzes found
                }
            } catch (error) {
                setError('Error fetching user quizzes. Please try again.');
            }
        };

        fetchUserQuizzes();
    }, [userId]);

    const handleToggleQuizDetails = (quizId) => {
        setSelectedQuizId(selectedQuizId === quizId ? null : quizId);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="user-quiz__container">
            <h2>User Quizzes</h2>
            {error && <p className="error-message">{error}</p>}
            {userQuizzes.map(quiz => (
                <div key={quiz.id} className={`user-quiz__card ${selectedQuizId === quiz.id ? 'flipped' : ''}`}>
                    <div className="front" onClick={() => handleToggleQuizDetails(quiz.id)}>
                        <h3>{quiz.title}</h3>
                        <p>Category: {quiz.category}</p>
                        <p>Total Questions: {quiz.num_questions}</p>
                        <Button variant="primary">Details</Button>
                    </div>
                    <div className="back">
                        <UserQuizDetails userId={userId} quizId={quiz.id} />
                    </div>
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


