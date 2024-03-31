import "./QuizPlayPage.scss";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Scoreboard from '../../components/Scoreboard/Scoreboard';
import shuffleArray from '../../utils/shuffleArray';
import clock from "../../assets/icons/undraw_clock.svg"

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
    const [timerInterval, setTimerInterval] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

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
        const interval = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timerInterval);
                    handleAnswer("Time's up!"); // Trigger handleAnswer with "Time's up!" when time runs out
                    return 0;
                }
            });
        }, 1000);
        setTimerInterval(interval);

        return () => clearInterval(interval);
    }, [currentQuestionIndex, quizData]);

    const handleAnswer = (selectedOption) => {
        const correctAnswer = quizData[currentQuestionIndex]?.correct_answer;
        if (selectedOption === correctAnswer) {
            setScore(prevScore => prevScore + 100);
            setShowFeedback(true);
            setFeedbackMessage('Correct!');

        } else {
            setShowFeedback(true);
            setFeedbackMessage(selectedOption === "Time's up!" ? "Time's up!" : 'Incorrect!');
            setShowCorrectAnswer(true);
        }

        setUserAnswers(prevState => ({
            ...prevState,
            [currentQuestionIndex]: selectedOption
        }));

        // Freeze the timer when an answer is clicked
        clearInterval(timerInterval); // Access timerInterval from state
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimeRemaining(30);
            setShowFeedback(false);
            setShowCorrectAnswer(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const colors = ['#5424FD', '#F5001E', '#FCC636', '#2B2B2B']; 

    if (loading) {
        return <p>Loading quiz...</p>;
    }

    return (
        <div className="container mt-3 play__container">
            <h2 className="play__title">Quiz Play Page</h2>
            <p className="mb-2 play__text">Question {currentQuestionIndex + 1} of {quizData.length}</p>
            <p className="mb-2 play__text">Time Remaining: {timeRemaining} seconds</p>
            <img className="play__icon" src={clock} alt="clock-icon" />
            <div className="card mb-3">
                <div className="card-body play__card">
                    <h5 className="card-title play__subtitle">{quizData[currentQuestionIndex]?.question}</h5>
                    <div className="row play__box">
                        {quizData[currentQuestionIndex]?.options.map((option, index) => (
                            <div key={index} className="col-md-6 mb-2 play__answers">
                                <button
                                    className="play__answers-button"
                                    style={{ backgroundColor: colors[index % colors.length] }} // Assign color based on index
                                    onClick={() => handleAnswer(option)}
                                    disabled={showFeedback}
                                >
                                    {option}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showFeedback && <p className="mb-2 play__feedback">{feedbackMessage}</p>}
            {showCorrectAnswer && <p className="mb-2 play__feedback play__feedback--red">Correct Answer: {quizData[currentQuestionIndex]?.correct_answer}</p>}
            <button
                className="btn btn-primary play__button"
                onClick={handleNextQuestion}
                disabled={!showFeedback}
            >
                {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
            {/* Show the score */}
            <div>
                <h4 className="play__score">Score: {score}</h4>
            </div>

            {quizCompleted && (
                <Scoreboard
                    score={score}
                    quizData={quizData}
                    userAnswers={userAnswers}
                    quizCompleted={quizCompleted}
                />
            )}
        </div>
    );
}

export default QuizPlayPage;
