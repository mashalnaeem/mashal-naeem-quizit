
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Create, Play, Run!</h1>
            <div className="row mt-5">
                {/* Card 1 */}
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Create a Quiz</Card.Title>
                            <Card.Text>
                                Create a custom quiz? Click here to get started
                            </Card.Text>
                            <Link to="/login">
                                <Button variant="primary">Create Now</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>

                {/* Card 2 */}
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Play Quizzes</Card.Title>
                            <Card.Text>
                            Wanna play an existing game? Browse through various quizzes and test your knowledge.
                            </Card.Text>
                            <Link to="/quizzes">
                                <Button variant="primary">Play Now</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
