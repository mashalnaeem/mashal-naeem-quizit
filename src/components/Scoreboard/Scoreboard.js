

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function Scoreboard({ score, quizData, showModal, setShowModal, userAnswers }) {

    const { userId } = useParams();

    const totalQuestions = quizData.length;
    const correctAnswers = Object.values(userAnswers).filter(answer => answer === true).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(0);

    // Define message and emoji based on percentage
    let message;
    let emoji;
    if (percentage >= 80) {
        message = "Great job!";
        emoji = "🎉";
    } else if (percentage >= 70) {
        message = "You still did great!";
        emoji = "😊";
    } else if (percentage >= 50) {
        message = "Halfway there!";
        emoji = "🌟";
    } else if (percentage > 0) {
        message = "Better luck next time!";
        emoji = "😔";
    } else {
        message = "All questions incorrect, try again maybe?";
        emoji = "😕";
    }


    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Quiz Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Score: {score}</h5>
                <p>Total Questions: {totalQuestions}</p>
                <p>Correct Answers: {correctAnswers}</p>
                <p>Incorrect Answers: {incorrectAnswers}</p>
                <p>Percentage: {percentage}%</p>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/${userId}/profile`}>
                    <Button variant="secondary">
                        Close
                    </Button>
                </Link>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Play Again
                </Button>
                <Link to="/quizzes">
                    <Button variant="primary">
                        Play Other Quiz
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default Scoreboard;



