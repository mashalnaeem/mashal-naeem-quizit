import "./Scoreboard.scss";

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Scoreboard({ score, quizData, userAnswers, quizCompleted }) {

    const { userId } = useParams();

    const totalQuestions = quizData.length;
    const percentage = ((score / (totalQuestions * 100)) * 100).toFixed(0);

    let correctAnswers = 0;
    let incorrectAnswers = 0;
    for (let i = 0; i < totalQuestions; i++) {
        const correctAnswer = quizData[i].correct_answer;
        const userAnswer = userAnswers[i];
        if (userAnswer === correctAnswer) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
    }

    let message;
    let emoji;
    if (percentage >= 80) {
        message = "Great job!";
        emoji = "🎉";
    } else if (percentage >= 70) {
        message = "You still did great!";
        emoji = "😊";
    } else if (percentage >= 50) {
        message = "Halfway there!";
        emoji = "🌟";
    } else if (percentage > 0) {
        message = "Better luck next time!";
        emoji = "😔";
    } else {
        message = "All questions incorrect, try again maybe?";
        emoji = "😕";
    }

    const updateUserScore = async () => {
        try {
            await axios.put(`http://localhost:8080/api/users/${userId}`, {
                current_score: score,
            });
        } catch (error) {
            console.error('Error updating user score:', error);
        }
    };

    useEffect(() => {

        if (quizCompleted) {
            updateUserScore();
        }
    }, [quizCompleted, score]);  

    return (
        <div className="scoreboard__container">
            <div className="scoreboard__content">
                <h2 className="scoreboard__title">Quiz Score</h2>
                <h5 className="scoreboard__subtitle">Score: {score}</h5>
                <p className="scoreboard__text">Total Questions: {totalQuestions}</p>
                <p className="scoreboard__text">Correct Answers: {correctAnswers}</p>
                <p className="scoreboard__text">Incorrect Answers: {incorrectAnswers}</p>
                <p className="scoreboard__text">Percentage: {percentage}%</p>
                <p className="scoreboard__text">{message} <span role="img" aria-label="emoji">{emoji}</span></p>
                <div className="scoreboard__buttons">
                    <Link to={`/${userId}/profile`}>
                        <button className="scoreboard__button scoreboard__button--red">Close</button>
                    </Link>
                    <button className="scoreboard__button scoreboard__button--blue" onClick={() => window.location.reload()}>Play Again</button>
                    <Link to={`/${userId}/quizzes`}>
                        <button className="scoreboard__button scoreboard__button--yellow">Play Another Quiz</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Scoreboard;
