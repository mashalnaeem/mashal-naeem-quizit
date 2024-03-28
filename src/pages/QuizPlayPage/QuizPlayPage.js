import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import Scoreboard from '../../components/Scoreboard/Scoreboard';

function QuizPlayPage() {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [timerRunning, setTimerRunning] = useState(true); // New state variable to track timer status
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { quizId } = useParams();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`);
                setQuizData(response.data);
                setLoading(false);
                setTimeRemaining(30);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchQuizData();

    }, [quizId]);

    useEffect(() => {
        // Initialize timerInterval in the useEffect
        const timerInterval = setInterval(() => {
            if (timerRunning) { // Check if timer should be running
                setTimeRemaining(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timerInterval); // Clear the interval when time runs out
                        handleAnswer(null); // Automatically handle answer when time runs out
                        return 0;
                    }
                });
            }
        }, 1000);

        return () => clearInterval(timerInterval); // Cleanup function to clear interval when component unmounts
    }, [timerRunning]);

    const handleAnswer = (selectedOption) => {
        setTimerRunning(false); // Stop the timer when an answer is clicked
        if (selectedOption === null) {
            selectedOption = "Time's up!";
        }
        setUserAnswers(prevState => ({
            ...prevState,
            [currentQuestionIndex]: selectedOption
        }));

        const correctAnswer = quizData[currentQuestionIndex]?.correct_answer;
        if (selectedOption === correctAnswer) {
            setScore(prevScore => prevScore + 1);
            setShowFeedback(true);
            setFeedbackMessage('Correct!');
        } else {
            setShowFeedback(true);
            setFeedbackMessage(selectedOption === "Time's up!" ? "Time's up!" : 'Incorrect!');
            setShowCorrectAnswer(true);
        }
    };


    const handleNextQuestion = () => {
        if (!quizData || quizData.length === 0) {
            console.error('Quiz data is undefined or empty.');
            return;
        }

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimeRemaining(30);
            setShowFeedback(false);
            setShowCorrectAnswer(false);
            setTimerRunning(true); // Start the timer for the next question

        } else {
            setShowModal(true);
        }
    };

    if (loading) {
        return <p>Loading quiz...</p>;
    }

    return (
        <div className="container mt-3">
            <h2>Quiz Play Page</h2>
            <p className="mb-2">Question {currentQuestionIndex + 1} of {quizData.length}</p>
            <p className="mb-2">Time Remaining: {timeRemaining} seconds</p>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{quizData[currentQuestionIndex]?.question}</h5>
                    <ul className="list-group list-group-flush">
                        {quizData[currentQuestionIndex]?.incorrect_answers.map((option, index) => (
                            <li key={index} className="list-group-item">
                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={() => handleAnswer(option)}
                                    disabled={showFeedback}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                        <li className="list-group-item">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => handleAnswer(quizData[currentQuestionIndex]?.correct_answer)}
                                disabled={showFeedback}
                            >
                                {quizData[currentQuestionIndex]?.correct_answer}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {showFeedback && <p className="mb-2">{feedbackMessage}</p>}
            {showCorrectAnswer && <p className="mb-2">Correct Answer: {quizData[currentQuestionIndex]?.correct_answer}</p>}
            <button
                className="btn btn-primary"
                onClick={handleNextQuestion}
                disabled={!showFeedback}
            >
                Next Question
            </button>

            {/* Bootstrap Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Score</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Content to display quiz score */}
                    Your quiz score is: {score}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuizPlayPage;
