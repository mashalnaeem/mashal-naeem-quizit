import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function QuizPlayPage() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate(); 
  const { quizId } = useParams();
  let timerInterval = null;

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
    if (quizData.length > 0) {
      timerInterval = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            handleAnswer(null); // Automatically mark answer as incorrect when time runs out
            setShowFeedback(true); 
            setFeedbackMessage('Time is up!');
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [quizData]);

  const handleAnswer = (selectedOption) => {
    clearInterval(timerInterval);
    if (selectedOption === null) {
      // Automatically mark answer as incorrect if time runs out
      selectedOption = 'Incorrect';
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
      setFeedbackMessage('Incorrect!');
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
    } else {
      navigate('/scoreboard'); 
    }
  };

  if (loading) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div>
      <h2>Quiz Play Page</h2>
      <p>Question {currentQuestionIndex + 1} of {quizData.length}</p>
      <p>Time Remaining: {timeRemaining} seconds</p>
      <p>{quizData[currentQuestionIndex]?.question}</p>
      <ul>
        {quizData[currentQuestionIndex]?.incorrect_answers.map((option, index) => (
          <li key={index}>
            <button 
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          </li>
        ))}
        <li>
          <button 
            onClick={() => handleAnswer(quizData[currentQuestionIndex]?.correct_answer)}
            disabled={showFeedback}
          >
            {quizData[currentQuestionIndex]?.correct_answer}
          </button>
        </li>
      </ul>
      {showFeedback && <p>{feedbackMessage}</p>}
      <button onClick={handleNextQuestion} disabled={!showFeedback}>Next Question</button>
      <p>Score: {score}</p>
    </div>
  );
}

export default QuizPlayPage;
