import "./QuizListPage.scss"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

import stickyNote from "../../assets/images/sticky-note.svg"

function QuizList() {

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    // Function to fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);

      } catch (error) {
        setError('Error fetching quizzes. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // JSX to render loading state
  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  // JSX to render error state
  if (error) {
    return <p>{error}</p>;
  }

  const colors = ['#F5001E', '#5424FD', '#FCC636'];

  return (
    <Container className='quiz'>
      <h2 className="text-center quiz__title">Quiz List</h2>
      <Row className="justify-content-center">
        {quizzes.map((quiz, index) => (
          <Col key={quiz.id} xs={12} sm={6} md={4} lg={6} xl={3} className="mb-4">
            <Card className="quiz__container" style={{ backgroundColor: colors[index % colors.length], position: 'relative' }}>
              <Card.Body className="quiz__card" style={{ position: 'relative' }}>
                <Card.Title className="quiz__subtitle">{quiz.title}</Card.Title>
                <Card.Subtitle className="quiz__text">Category: {quiz.category}</Card.Subtitle>
                <Card.Text className="quiz__questions">Total Questions: {quiz.num_questions}</Card.Text>
                <img className="quiz__icon" src={stickyNote} alt="sticky-note" />
              </Card.Body>
              <Link to={`/${userId}/quizzes/${quiz.id}`}>
                <Button className="quiz__button">Details</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};



export default QuizList;
