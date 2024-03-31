import "./HomePage.scss"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';

function HomePage() {
    
    const isLoggedIn = sessionStorage.getItem('token') !== null;
    const userId = sessionStorage.getItem('userId');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCreateQuizClick = () => {
        if (!isLoggedIn) {
            setShowModal(true);
        } else {
            navigate(`/${userId}/create`);
        }
    };

    const handlePlayQuizzesClick = () => {
        if (!isLoggedIn) {
            setShowModal(true);
        } else {
            navigate(`/${userId}/quizzes`);
        }
    };

    return (
        <div className="home">
            <h1 className="text-center home__title">
                <span className="home__create">Create,</span>
                <span className="home__play">Play,</span>
                <span className="home__run">Learn!</span>
            </h1>

            <Card className="home__container">
                <Card.Body className="home__card">
                    <Card.Title className="home__subtitle">Create a Quiz</Card.Title>
                    <Card.Text className="home__descrip">
                        Create a custom quiz to challenge your friends or students! Choose your topics, set the number of questions, and customize the difficulty level. Click here to get started.
                    </Card.Text>
                    <Button className="home__button" onClick={handleCreateQuizClick}>Create Now</Button>
                </Card.Body>
            </Card>

            <Card className="home__container">
                <Card.Body className="home__card home__card--red">
                    <Card.Title className="home__subtitle">Play Quizzes</Card.Title>
                    <Card.Text className="home__descrip">
                        Are you ready to challenge yourself? Explore our collection of quizzes on various topics and put your knowledge to the test! Click below to start playing!
                    </Card.Text>
                    <Button className="home__button" onClick={handlePlayQuizzesClick}>Play Now</Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to log in to access this feature. Click below to proceed to the login page.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => navigate("/login")}>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HomePage;
