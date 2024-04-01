import "./UserQuizPage.scss"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ModalComponent from "../../components/ModalComponent/ModalComponent";

function UserQuizPage() {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [userQuizzes, setUserQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const fetchUserQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}`);
                setUserQuizzes(response.data);

                if (response.data.length === 0) {
                    setShowModal(true); // Show modal if no quizzes found
                }
            } catch (error) {
                setError('Error fetching user quizzes. Please try again.');
            }
        };

        fetchUserQuizzes();
    }, [userId]);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const colors = ['#F5001E', '#5424FD', '#FCC636'];

    return (
        <div className="user-quiz">
            <div className="user-quiz__container">
                <h2 className="user-quiz__title">User Quizzes</h2>
                {error && <p className="user-quiz__error">{error}</p>}
                {userQuizzes.map((quiz, index) => (
                    <div key={quiz.id} className="user-quiz__card-container">
                        <div className="user-quiz__card" style={{ backgroundColor: colors[index % colors.length] }}>
                            <h3 className="user-quiz__subtitle">{quiz.title}</h3>
                            <p className="user-quiz__text">Category: {quiz.category}</p>
                            <p className="user-quiz__text">Total Questions: {quiz.num_questions}</p>
                            <Link to={`/${userId}/user_quizzes/${quiz.id}`}>
                                <Button className="user-quiz__button">Details</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <ModalComponent
                show={showModal}
                onHide={handleCloseModal}
                title="Sorry, no quizzes found"
                body="There are no created quizzes. Would you like to create one?"
                primaryButton="Create a Quiz"
                onClick={() => navigate(`/${userId}/create`)}
            />
        </div>
    );
}

export default UserQuizPage;


