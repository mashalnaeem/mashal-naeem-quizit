import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";

function QuizDetailsPage() {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { quizId } = useParams();

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
    }, []);

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
                <Link to={`/quizzes/${quizId}/play`}>
                    <button className="start-quiz-button">Start Quiz</button>
                </Link>
            </section>

            {/* Additional Information Section */}
            <section className="additional-information">
                <h2>Additional Information</h2>
                <p><strong>Creator:</strong> {quiz.creator}</p>
                <p><strong>Rating:</strong> {quiz.rating}</p>
                {/* Add related quizzes */}
            </section>
        </div>
    );
}

export default QuizDetailsPage;
