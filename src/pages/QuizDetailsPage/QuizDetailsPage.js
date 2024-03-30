import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';

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
        <div className="quiz-details">
            {/* Header Section */}
            <header className="quiz-details-header">
                <h1>{quiz.title}</h1>
                {/* Add navigation links if needed */}
            </header>

            {/* Quiz Information Section */}
            <section className="quiz-information">
                <h2>Quiz Information</h2>
                <p><strong>Description:</strong> {quiz.description}</p>
                <p><strong>Duration:</strong> {quiz.duration_minutes} minutes</p>
                <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
                <p><strong>Category:</strong> {quiz.category}</p>
                <p><strong>Questions:</strong> {quiz.num_questions}</p>
            </section>

            {/* Action Section */}
            <section className="quiz-actions">
                <Link to={`/${userId}/quizzes/${quizId}/play`}>
                    <button className="start-quiz-button">Start Quiz</button>
                </Link>
                {/* Display the quiz code and broadcast button */}
                {quizCode ? (
                    <div>
                        <p>Quiz Code: {quizCode}</p>
                        <button className="start-broadcast-button" onClick={handleBroadcastQuiz}>Start Broadcast</button>
                    </div>
                ) : (
                    <button className="start-broadcast-button" onClick={handleBroadcastQuiz}>Broadcast Quiz</button>
                )}
            </section>
        </div>
    );
}

export default QuizDetailsPage;
