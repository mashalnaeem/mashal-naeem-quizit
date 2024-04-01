import "./QuizDetailsPage.scss"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';

import BackIcon from '../../components/BackIcon/BackIcon';

function QuizDetailsPage() {

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizCode, setQuizCode] = useState(null); // New state variable for quiz code
    const { userId, quizId } = useParams();
    const socket = io('http://localhost:8080'); // Initialize WebSocket connection

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}`);
                setQuiz(response.data[0]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchQuizDetails();

        // Clean up the socket connection
        return () => {
            socket.disconnect();
        };
    }, [quizId, socket]);

    // Emit event to broadcast the quiz
    const handleBroadcastQuiz = () => {
        socket.emit('broadcastQuiz', quizId);
    };

    // Listen for the generated quiz code from the server
    useEffect(() => {
        
        socket.on('quizCodeGenerated', (generatedCode) => {
            setQuizCode(generatedCode);
        });

        return () => {
            socket.off('quizCodeGenerated');
        };
    }, [socket]);

    if (loading) {
        return <p>Loading quiz details...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!quiz) {
        return <p>No quiz details found.</p>;
    }

    return (
        <section className="details">
            <div className="details__container">
                <BackIcon className="profile__back" />

                {/* Header Section */}
                <header className="details__box">
                    <h1 className="details__title">{quiz.title}</h1>
                    {/* Add navigation links if needed */}
                </header>

                {/* Quiz Information Section */}
                <article className="details__box">
                    <h2 className="details__subtitle">Quiz Information</h2>
                    <p className="details__text"><strong>Description:</strong> {quiz.description}</p>
                    <p className="details__text"><strong>Duration:</strong> {quiz.duration_minutes} minutes</p>
                    <p className="details__text"><strong>Difficulty:</strong> {quiz.difficulty}</p>
                    <p className="details__text"><strong>Category:</strong> {quiz.category}</p>
                    <p className="details__text"><strong>Questions:</strong> {quiz.num_questions}</p>
                </article>

                {/* Action Section */}
                <article className="details__button-box">
                    <Link to={`/${userId}/quizzes/${quizId}/play`}>
                        <button className="details__button">Start Quiz</button>
                    </Link>

                    {/* Display the quiz code and broadcast button */}
                    {quizCode ? (
                        <div>
                            <p className="details__text">Quiz Code: {quizCode}</p>
                            <button className="details__button" onClick={handleBroadcastQuiz}>Start Broadcast</button>
                        </div>
                    ) : (
                        <button className="details__button" onClick={handleBroadcastQuiz}>Broadcast Quiz</button>
                    )}
                </article>
            </div>
        </section>
    );
}

export default QuizDetailsPage;
