import "./HomePage.scss"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import ModalComponent from "../../components/ModalComponent/ModalComponent";

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
        <section className="home">
            <h1 className="text-center home__title">
                <span className="home__create">Create, </span>
                <span className="home__play">Play, </span>
                <span className="home__run">Learn!</span>
            </h1>
            <article className="home__body">
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
            </article>

            <ModalComponent
                title="Log In Required"
                body="You need to log in to access this feature. Click below to proceed to the login page."
                closeButton="Close"
                primaryButton="Go to Login"
                onClick={() => navigate("/login")}
                onHide={() => setShowModal(false)}
                show={showModal}
            />
        </section>
    );
}

export default HomePage;
