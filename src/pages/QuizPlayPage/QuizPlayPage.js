import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Scoreboard from '../../components/Scoreboard/Scoreboard';
import shuffleArray from '../../utils/shuffleArray';

function QuizPlayPage() {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    const { quizId } = useParams();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`);
                const shuffledData = response.data.map(question => ({
                    ...question,
                    options: shuffleArray([...question.incorrect_answers, question.correct_answer])
                }));
                setQuizData(shuffledData);
                setLoading(false);
                setTimeRemaining(30);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchQuizData();
    }, [quizId]);

    useEffect(() => {
        // Start the timer interval when quiz data is loaded
        if (quizData.length > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(interval); // Clear the interval when time runs out
                        handleAnswer(null); // Automatically handle answer when time runs out
                        return 0;
                    }
                });
            }, 1000);
            setTimerInterval(interval); // Save the interval to state variable
        }
        return () => clearInterval(timerInterval); // Cleanup function to clear interval when component unmounts
    }, [quizData, currentQuestionIndex]);

    const handleAnswer = (selectedOption) => {
        clearInterval(timerInterval); // Clear the timer interval to freeze the timer
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
        } else {
            // If there are no more questions, show the modal
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
                        {quizData[currentQuestionIndex]?.options.map((option, index) => (
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
                {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>

            {/* Scoreboard Modal */}
            <Scoreboard
                score={score}
                quizData={quizData}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
}

export default QuizPlayPage;
