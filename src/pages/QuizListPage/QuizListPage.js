import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./QuizListPage.scss"

function QuizList() {

    const [quizzes, setQuizzes] = useState([]);
    const [difficultyLevels, setDifficultyLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch quizzes from the backend
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quizzes');
                setQuizzes(response.data);
                setDifficultyLevels(response.data);

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

    // JSX to render list of quizzes
    return (
        <Container>
            <h2 className="text-center">Quiz List</h2>
            <Row className="justify-content-center">
                {quizzes.map((quiz) => (
                    <Col key={quiz.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="shadow quiz__container" >
                            <Card.Body>
                                <Card.Title>{quiz.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Category: {quiz.category}</Card.Subtitle>
                                <Card.Text>Total Questions: {quiz.num_questions}</Card.Text>
                                <Link to={`/quizzes/${quiz.id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};


export default QuizList;
