import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function QuizCreatePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        userId: userId,
        title: '',
        description: '',
        category: '',
        difficulty: '',
        num_questions: '',
        duration_minutes: '', 
        isPublic: false,
        questions: [{ question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Adjust for checkbox value and other inputs
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleQuestionChange = (e, index, field, subIndex) => {
        const { value } = e.target;
        const updatedQuestions = [...formData.questions];
        if (field === 'incorrect_answers') {
            updatedQuestions[index].incorrect_answers[subIndex] = value;
        } else {
            updatedQuestions[index][field] = value;
        }
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions,
            num_questions: updatedQuestions.length
        }));
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    };

    const handleAddQuestion = () => {
        setFormData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, { question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/user_quizzes/${userId}`, formData);
            console.log('New user quiz created:', response.data);
            setShowModal(true);
            
        } catch (error) {
            console.error('Error creating user quiz:', error);
            // Handle error, display error message, etc.
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`/${userId}/user_quizzes`);
    };

    return (
        <div>
            <h2>Create User Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Language">Language</option>
                        <option value="Science">Science</option>
                        <option value="Math">Math</option>
                        <option value="History">History</option>
                        <option value="Social Studies">Social Studies</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                    {formData.category === "Other" && (
                        <input
                            type="text"
                            name="otherCategory"
                            placeholder="Enter Other Category"
                            value={formData.otherCategory}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label>Duration (Minutes):</label>
                    <input type="number" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} required />
                </div>
                <div>
                    <label>Is Public:</label>
                    <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
                </div>
                <div>
                    <p>Total Questions: {formData.questions.length}</p>
                    <button type="button" onClick={handleAddQuestion}>Add Question</button>
                    {formData.questions.map((question, index) => (
                        <div key={index}>
                            <label>Question {index + 1}:</label>
                            <input
                                type="text"
                                name={`questions[${index}].question`}
                                value={formData.questions[index].question}
                                onChange={(e) => handleQuestionChange(e, index, 'question')}
                                required
                            />
                            <div>
                                <label>Correct Answer:</label>
                                <input
                                    type="text"
                                    name={`questions[${index}].correct_answer`}
                                    value={formData.questions[index].correct_answer}
                                    onChange={(e) => handleQuestionChange(e, index, 'correct_answer')}
                                    required
                                />
                            </div>
                            <div>
                                <label>Incorrect Answers:</label>
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrect_answers[0]`}
                                    value={formData.questions[index].incorrect_answers[0]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', 0)}
                                    required
                                />
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrect_answers[1]`}
                                    value={formData.questions[index].incorrect_answers[1]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', 1)}
                                    required
                                />
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrect_answers[2]`}
                                    value={formData.questions[index].incorrect_answers[2]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', 2)}
                                    required
                                />
                            </div>
                            <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The quiz has been successfully updated.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuizCreatePage;
