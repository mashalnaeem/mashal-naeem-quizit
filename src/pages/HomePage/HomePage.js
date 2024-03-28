import React, { useState } from 'react';
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
        <div className="container mt-5">
            <h1 className="text-center">Create, Play, Run!</h1>
            <div className="row mt-5">
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Create a Quiz</Card.Title>
                            <Card.Text>
                                Create a custom quiz? Click here to get started
                            </Card.Text>
                            <Button variant="primary" onClick={handleCreateQuizClick}>Create Now</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Play Quizzes</Card.Title>
                            <Card.Text>
                                Wanna play an existing game? Browse through various quizzes and test your knowledge.
                            </Card.Text>
                            <Button variant="primary" onClick={handlePlayQuizzesClick}>Play Now</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
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
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HomePage;
