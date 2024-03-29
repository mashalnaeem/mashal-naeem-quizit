
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const UserQuizDetails = ({ userId, quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Quiz Details</h2>
      <p>Title: {quiz.title}</p>
      <p>Description: {quiz.description}</p>
      <p>Category: {quiz.category}</p>
      <p>Time (Mintues): {quiz.duration_minutes}</p>
      <p>Settings: {quiz.is_public? "Public" : "Private"}</p>
      <Link to={`/${userId}quiz/${quizId}/broadcast_play`}><Button variant="primary">Broadcast Play</Button></Link>
    </div>
  );
};

export default UserQuizDetails;
